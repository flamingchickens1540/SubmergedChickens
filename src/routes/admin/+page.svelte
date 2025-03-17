<script lang="ts">
    import { X } from "lucide-svelte"
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
            username: "Admin",
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

    socket.on("robot_left_queue", robot => {
        const index = robot_queue.findIndex(
            ({ key, color: _ }) => key === robot.key
        )
        if (index === -1) return

        const team_match = robot_queue.splice(index, 1)[0]
        pending_robots.value.push(team_match)
    })

    socket.on("new_team_match", (team_match: UncountedTeamMatch) => {
        const index = pending_robots.value.findIndex(
            ({ key, color: _ }) => Number.parseInt(key) == team_match.team_key
        )
        if (index === -1) return
        const robot = pending_robots.value.splice(index, 1)[0]

        team_match.color = robot.color
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
        if (next_robots.some(({ key, color: _ }) => key === "")) return

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

    const update_team_matches = async () => {
        for (
            let i = 1;
            i < Number.parseInt(next_match_key.value.slice(2));
            i++
        ) {
            let match_key = "qm" + i.toString()
            const res = await fetch(`/api/updateMatch`, {
                method: "PATCH",
                body: JSON.stringify(match_key),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!res.ok) {
                console.log(`Updated team matches up to ${match_key}`)
                break
            }
        }
    }

    const clear_robot_queue = async () => {
        robot_queue = []
        socket.emit("clear_robot_queue")
    }

    let event_selection = $state("Event Key")

    // Disable Interactive Element
    const disabled = "pointer-events-none opacity-30"

    const can_queue = $derived(
        next_red_robots.value.some(r => r === "") ||
            next_blue_robots.value.some(r => r === "")
            ? disabled
            : ""
    )

    const can_autoload = $derived(next_match_key.value === "" ? disabled : "")

    const can_clear_rq = $derived(robot_queue.length === 0 ? disabled : "")

    const can_clear_pm = $derived(
        submitted_team_matches.value.length === 0 ? disabled : ""
    )
</script>

<div
    class="m-auto grid max-w-6xl grid-cols-2 grid-rows-5 gap-2 p-2 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 md:grid-cols-5"
>
    <div class="col-span-2 row-span-2 grid grid-cols-subgrid grid-rows-subgrid">
        <div class="col-span-2 grid grid-cols-3 gap-2 rounded bg-gunmetal p-2">
            <input
                bind:value={next_match_key.value}
                placeholder="Next Match"
                class="rounded bg-eerie_black p-2"
            />
            <button
                class="rounded bg-eerie_black p-2 {can_autoload}"
                onclick={auto_load_teams}>Auto Load</button
            >
            <button
                onclick={queue_match}
                class="rounded bg-eerie_black p-2 {can_queue}"
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
            <span class="col-span-3 text-center">Current Robots</span>
            <div class="grid max-h-28 grid-cols-3 gap-2">
                {#each robot_queue as { key, color }}
                    <div
                        class="grid h-12 grid-cols-2 place-items-center rounded bg-eerie_black p-2"
                    >
                        {key}
                        <div
                            class="size-6 rounded-full bg-{color === 'red'
                                ? 'bittersweet'
                                : 'steel_blue'}"
                        ></div>
                    </div>
                {/each}
                {#each pending_robots.value as { key, color }}
                    <div
                        class="grid h-12 grid-cols-2 place-items-center rounded bg-crayola_orange p-2"
                    >
                        {key}
                        <div
                            class="size-6 rounded-full bg-{color === 'red'
                                ? 'bittersweet'
                                : 'steel_blue'}"
                        ></div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="row-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
        <span class="text-center">Scout Queue</span>
        <div class="grid max-h-64 grid-cols-1 gap-2 overflow-y-scroll">
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
    <div class="row-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
        <span class="text-center">Past Team Matches</span>
        <div class="grid max-h-64 grid-cols-1 gap-2 overflow-y-scroll">
            {#each submitted_team_matches.value as team_match}
                <div
                    class="grid h-12 grid-cols-2 place-items-center rounded bg-jungle_green p-2 text-xl"
                >
                    {team_match.team_key}
                    <div
                        class="size-6 rounded-full bg-{team_match.color ===
                        'red'
                            ? 'bittersweet'
                            : 'steel_blue'}"
                    ></div>
                </div>
            {/each}
        </div>
    </div>

    <EventManager {tba_event_keys} bind:selection={event_selection} />
    <div class="grid gap-2 rounded bg-gunmetal p-2">
        <button
            class="rounded bg-eerie_black {can_clear_rq} p-2"
            onclick={clear_robot_queue}>Clear Robot Queue</button
        ><button
            class="rounded bg-eerie_black {can_clear_pm} p-2"
            onclick={() => {
                pending_robots.value = []
                submitted_team_matches.value = []
            }}>Clear Past Matches</button
        ><button class="rounded bg-eerie_black" onclick={update_team_matches}
            >Verify Data TBA</button
        >
    </div>
</div>
