<script lang="ts">
    import { X } from "lucide-svelte"
    import { io, Socket } from "socket.io-client"
    import { LocalStore, localStore } from "@/localStore.svelte"
    import EventManager from "./EventManager.svelte"
    import type { PageProps } from "./$types"
    import { error } from "@/consoleUtils"
    import type { UncountedTeamMatch } from "@/types"
    import { prisma } from "@/prisma"

    type QueuedTeamMatch = {
        team_key: string
        color: string
    }

    type CurrentRobot = {
        team_key: string
        color: string
        scout?: string
        displaying_tk: boolean
        tm_status: "Queue" | "Pending" | "Submitted" | "Removed"
    }

    type PendingTeamMatch = {
        team_key: string
        color: string
        scout: string
        displaying_tk: boolean
    }

    type SubmittedTeamMatch = UncountedTeamMatch & {
        scout_username?: string
        displaying_tmk: boolean
    }

    let { data }: PageProps = $props()
    const tba_event_keys = data.tba_event_keys

    let next_match_key = $state(localStore<string>("next_match_key", ""))

    let next_red_robots = $state(
        localStore<string[]>("next_red_robots", ["", "", ""])
    )
    let next_blue_robots = $state(
        localStore<string[]>("next_blue_robots", ["", "", ""])
    )

    let current_robots: LocalStore<CurrentRobot[]> = $state(
        localStore("current_robots", [])
    )
    let scout_queue: string[] = $state([])
    let robot_queue: QueuedTeamMatch[] = $state([])

    let submitted_team_matches: LocalStore<SubmittedTeamMatch[]> = $state(
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
        (response: { robots: QueuedTeamMatch[] }) => {
            console.log(response.robots)
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

    socket.on("robot_left_queue", ({ team_data, scout }) => {
        const scout_index = scout_queue.indexOf(scout)
        if (scout_index !== -1) scout_queue.splice(scout_index, 1)

        const index = robot_queue.findIndex(
            ({ team_key, color: _ }) => team_key === team_data.team_key
        )
        if (index === -1) return

        robot_queue.splice(index, 1)
        const sent_robot = current_robots.value.find((robot: CurrentRobot) => {
            robot.team_key === team_data.team_key
        })
        if (!sent_robot) return
        sent_robot!.tm_status = "Pending"
        sent_robot.scout = scout
    })

    socket.on("new_team_match", (team_match: UncountedTeamMatch) => {
        const submitted: CurrentRobot = current_robots.value.find(
            (robot: CurrentRobot) =>
                parseInt(robot.team_key) === team_match.team_key
        ) ?? {
            team_key: team_match.team_key.toString(),
            color: "none",
            scout: "", // todo: pull from db
            displaying_tk: true,
            tm_status: "Submitted",
        }
        submitted.tm_status = "Submitted"

        const submitted_team_match = {
            ...team_match,
            color: submitted.color,
            scout_username: submitted.scout,
            displaying_tmk: true,
        }

        submitted_team_matches.value.push(submitted_team_match)
    })

    const queue_match = async () => {
        let next_robots = [
            ...next_red_robots.value.map(team_key => {
                return {
                    team_key,
                    color: "red",
                }
            }),
            ...next_blue_robots.value.map(team_key => {
                return {
                    team_key,
                    color: "blue",
                }
            }),
        ]
        if (next_robots.some(({ team_key, color: _ }) => team_key === ""))
            return

        socket.emit("send_match", [next_match_key.value, next_robots])

        robot_queue = [
            ...next_red_robots.value.map(team_key => {
                return { team_key, color: "red" }
            }),
            ...next_blue_robots.value.map(team_key => {
                return { team_key, color: "blue" }
            }),
        ]
        current_robots.value = robot_queue.map(({ team_key, color }) => {
            return {
                team_key,
                color,
                displaying_tk: true,
                tm_status: "Queue",
            }
        })

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
        current_robots.value.forEach((robot: CurrentRobot) => {
            if (robot.tm_status === "Queue") {
                robot.tm_status = "Removed"
            }
        })
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
            <div class="grid max-h-28 grid-cols-3 gap-2 overflow-y-scroll">
                {#each current_robots.value as { team_key, color, scout, displaying_tk, tm_status }, i}
                    <button
                        class="grid h-12 grid-cols-2 place-items-center rounded {tm_status ==
                        'Pending'
                            ? 'bg-crayola_orange'
                            : tm_status == 'Submitted'
                              ? 'bg-jungle_green'
                              : 'bg-eerie_black'} p-2"
                        onclick={() => {
                            if (
                                tm_status == "Pending" ||
                                tm_status == "Submitted"
                            ) {
                                current_robots.value[i].displaying_tk =
                                    !displaying_tk
                            }
                        }}
                        >{#if tm_status != "Removed"}
                            {#if displaying_tk}
                                {team_key}
                            {:else}
                                {scout}
                            {/if}
                        {/if}

                        <div
                            class="size-6 rounded-full bg-{color === 'red'
                                ? 'bittersweet'
                                : 'steel_blue'}"
                        ></div>
                    </button>
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
            {#each submitted_team_matches.value as team_match, i}
                <button
                    class="grid h-12 grid-cols-1 place-items-center rounded bg-jungle_green p-2 text-center"
                    onclick={() =>
                        (submitted_team_matches.value[i].displaying_tmk =
                            !team_match.displaying_tmk)}
                >
                    {#if team_match.displaying_tmk}
                        {team_match.match_key} {team_match.team_key}
                    {:else}
                        {team_match.scout_username}
                    {/if}
                </button>
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
                submitted_team_matches.value = []
            }}>Clear Past Matches</button
        ><button class="rounded bg-eerie_black" onclick={update_team_matches}
            >Verify Data TBA</button
        >
    </div>
</div>
