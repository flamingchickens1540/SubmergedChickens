<script lang="ts">
    import { Dot, X } from "lucide-svelte"
    import { io, Socket } from "socket.io-client"
    import { LocalStore, localStore } from "@/localStore.svelte"
    import EventManager from "./EventManager.svelte"
    import type { PageProps } from "./$types"
    import { error } from "@/consoleUtils"
    import type { UncountedTeamMatch } from "@/types"

    let { data }: PageProps = $props()
    const tba_event_keys = data.tba_event_keys

    let next_match_key = $state(localStore<string>("next_match_key", ""))

    let next_red_robots = $state(
        localStore<string[]>("next_red_robots", ["", "", ""])
    )
    let next_blue_robots = $state(
        localStore<string[]>("next_blue_robots", ["", "", ""])
    )

    let scout_queue: string[] = $state([])

    let robot_queue: { key: string; color: string }[] = $state([])
    let pending_robots: LocalStore<{ key: string; color: string }[]> = $state(
        localStore("pending_robots", [])
    )
    // TODO Change to actual type
    // TODO Pull from backend
    let submitted_team_matches: LocalStore<UncountedTeamMatch[]> = $state(
        localStore("submitted_team_matches", [])
    )

    let socket: Socket = io({
        auth: {
            token: "celary",
            username: "admin",
        },
    })

    socket.emit("get_scout_queue", (response: { scouts: string[] }) => {
        scout_queue = response.scouts
    })

    socket.emit(
        "get_robot_queue",
        (response: { robots: { key: string; color: string }[] }) => {
            robot_queue = response.robots
        }
    )

    socket.on("scout_joined_queue", (scout: string) => {
        scout_queue.push(scout)
    })

    socket.on("scout_left_queue", (scout: string) => {
        const index = scout_queue.indexOf(scout)
        if (index === -1) return

        scout_queue.splice(index, 1)
    })

    socket.on("robot_left_queue", (robot: string) => {
        const index = robot_queue.findIndex(
            ({ key, color: _ }) => key !== robot
        )
        if (index === -1) return

        const team_match = robot_queue.splice(index, 1)[0]
        pending_robots.value.push(team_match)
    })

    socket.on("new_team_match", (team_match: UncountedTeamMatch) => {
        const index = pending_robots.value.findIndex(
            ({ key, color: _ }) => Number.parseInt(key) !== team_match.team_key
        )
        if (index === -1) return
        pending_robots.value.splice(index, 1)[0]

        submitted_team_matches.value.push(team_match)
    })

    const queue_match = async () => {
        let next_robots = [
            ...next_red_robots.value.map(key => {
                return {
                    key,
                    color: "red",
                }
            }),
            ...next_blue_robots.value.map(key => {
                return {
                    key,
                    color: "blue",
                }
            }),
        ]

        socket.emit("send_match", [next_match_key.value, next_robots])

        robot_queue = [
            ...next_red_robots.value.map(key => {
                return { key, color: "red" }
            }),
            ...next_blue_robots.value.map(key => {
                return { key, color: "blue" }
            }),
        ]

        next_match_key.value =
            next_match_key.value.slice(0, 2) +
            (Number.parseInt(next_match_key.value.slice(2)) + 1).toString()
        next_red_robots.value = ["", "", ""]
        next_blue_robots.value = ["", "", ""]
    }

    const remove_scout = (scout_id: string) => {
        const index = scout_queue.indexOf(scout_id)
        if (index === -1) return

        scout_queue.splice(index, 1)

        socket.emit("leave_scout_queue", scout_id)
    }

    const robotsEqual = (
        robot1: [string, "red" | "blue"],
        robot2: [string, "red" | "blue"]
    ): boolean => {
        return robot1[0] === robot2[0] && robot1[1] === robot2[1]
    }

    // const open_modal = (team_match: SubmittedMatch) => {
    //     displayed_team_match = team_match
    //     show_modal = true
    // }
    const auto_load_teams = async () => {
        const res = await fetch(`/api/getMatch/${next_match_key.value}`, {
            method: "GET",
        })
        if (!res.ok) {
            error(
                `Failed to get team matches for match ${next_match_key.value}`
            )
            return
        }

        const { red, blue }: { red: string[]; blue: string[] } =
            await res.json()
        next_red_robots.value = red
        next_blue_robots.value = blue
    }

    const clear_robot_queue = async () => {
        robot_queue = []
        socket.emit("clear_robot_queue")
    }

    let event_selection = $state("Event Key")
</script>

<div
    class="m-auto grid max-w-6xl grid-cols-2 grid-rows-6 gap-2 p-2 sm:grid-cols-3 sm:grid-rows-3 sm:gap-4 md:grid-cols-5"
>
    <div class="col-span-2 row-span-2 grid grid-cols-subgrid grid-rows-subgrid">
        <div class="col-span-2 grid grid-cols-3 gap-2 rounded bg-gunmetal p-2">
            <input
                bind:value={next_match_key.value}
                placeholder="Next Match"
                class="rounded bg-eerie_black p-2"
            />
            <button class="rounded bg-eerie_black p-2" onclick={auto_load_teams}
                >Auto Load</button
            >
            <button onclick={queue_match} class="rounded bg-eerie_black p-2"
                >Queue Match</button
            >
            {#each next_red_robots.value as _robot, i}
                <input
                    bind:value={next_red_robots.value[i]}
                    class="rounded bg-bittersweet p-2"
                />
            {/each}
            {#each next_blue_robots.value as _robot, i}
                <input
                    bind:value={next_blue_robots.value[i]}
                    class="rounded bg-steel_blue p-2"
                />
            {/each}
        </div>
        <div class="col-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
            <span class="col-span-3 text-center"
                >Team Matches <button
                    class="rounded bg-eerie_black p-2"
                    onclick={() => {
                        pending_robots.value = []
                        submitted_team_matches.value = []
                    }}>Clear (not db)</button
                ></span
            >
            <div class="grid max-h-28 grid-cols-3 gap-2 overflow-y-scroll">
                {#each robot_queue as { key, color }}
                    <div
                        class="grid h-12 grid-cols-2 place-items-center rounded bg-eerie_black p-2"
                    >
                        <div>{key}</div>
                        <div
                            class="size-6 rounded-full bg-{color === 'red'
                                ? 'bittersweet'
                                : 'steel_blue'}"
                        ></div>
                    </div>
                {/each}
                {#each pending_robots.value as { key, color }}
                    <div
                        class="grid grid-cols-2 place-items-center rounded bg-crayola_orange p-2"
                    >
                        <div>{key}</div>
                        <div
                            class="grid h-6 w-6 rounded-full bg-{color === 'red'
                                ? 'bittersweet'
                                : 'steel_blue'}"
                        ></div>
                    </div>
                {/each}
                {#each submitted_team_matches.value as team_match}
                    <div
                        class="grid place-items-center rounded bg-jungle_green p-2"
                    >
                        <div>
                            {team_match.match_key}:{team_match.team_key}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div
        class="row-span-2 flex max-h-96 flex-col gap-2 rounded bg-gunmetal p-2"
    >
        <span class="text-center">Scout Queue</span>
        <div class="flex flex-col gap-2 overflow-auto">
            {#each scout_queue as scout}
                <div
                    class="flex items-center justify-between rounded bg-eerie_black p-1"
                >
                    {scout}
                    <button
                        onclick={() => remove_scout(scout)}
                        class="rounded bg-gunmetal p-1"><X /></button
                    >
                </div>
            {/each}
        </div>
    </div>

    <EventManager {tba_event_keys} bind:selection={event_selection} />
    <button class="rounded bg-gunmetal" onclick={clear_robot_queue}
        >Clear Robot Queue</button
    >
</div>
