<script lang="ts">
    import { X } from "lucide-svelte"
    import { io, Socket } from "socket.io-client"
    import { LocalStore, localStore } from "@/localStore.svelte"
    import EventManager from "./EventManager.svelte"
    import type { PageProps } from "./$types"
    import { error } from "@/consoleUtils"
    import type { UncountedTeamMatch } from "@/types"

    type QueuedTeamMatch = {
        team_key: string
        color: string
    }

    type PendingTeamMatch = {
        team_key: string
        color: string
        scout: string
        displaying_tk: boolean
    }

    type SubmittedTeamMatch = UncountedTeamMatch & {
        scout_username: string
        displaying_tmk: boolean
        color: string
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

    let scout_queue: string[] = $state([])
    let robot_queue: QueuedTeamMatch[] = $state([])
    let pending_team_matches: LocalStore<PendingTeamMatch[]> = $state(
        localStore("pending_team_matches", [])
    )

    let submitted_team_matches: LocalStore<SubmittedTeamMatch[]> = $state(
        localStore("submitted_team_matches", [])
    )
    let past_team_matches: LocalStore<SubmittedTeamMatch[]> = $state(
        localStore("past_team_matches", [])
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
        const index = robot_queue.findIndex(
            ({ team_key, color: _ }) => team_key === team_data.team_key
        )
        if (index === -1) return

        const { team_key, color }: QueuedTeamMatch = robot_queue.splice(
            index,
            1
        )[0]
        const pending_team_match: PendingTeamMatch = {
            team_key,
            color,
            scout,
            displaying_tk: true,
        }
        pending_team_matches.value.push(pending_team_match)
    })

    socket.on("new_team_match", (team_match: UncountedTeamMatch) => {
        const index = pending_team_matches.value.findIndex(
            ({ team_key, color: _ }) =>
                Number.parseInt(team_key) == team_match.team_key
        )
        if (index === -1) return
        const robot = pending_team_matches.value.splice(index, 1)[0]

        const submitted_team_match = {
            ...team_match,
            color: robot.color,
            scout_username: robot.scout,
            displaying_tmk: robot.displaying_tk,
        }

        if (
            submitted_team_matches.value.length +
                pending_team_matches.value.length +
                robot_queue.length >
            5
        ) {
            // Handles the case where a new match is queued before an old team_match is submitted
            past_team_matches.value.push(submitted_team_match)
        } else {
            // Handles the case where a new match hasn't been queued yet
            submitted_team_matches.value.push(submitted_team_match)
        }
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

        next_match_key.value =
            next_match_key.value.slice(0, 2) +
            (Number.parseInt(next_match_key.value.slice(2)) + 1).toString()
        next_red_robots.value = ["", "", ""]
        next_blue_robots.value = ["", "", ""]

        past_team_matches.value = submitted_team_matches.value
        submitted_team_matches.value = []
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
        past_team_matches.value.length === 0 ? disabled : ""
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
                {#each robot_queue as { team_key, color }}
                    <div
                        class="grid h-12 grid-cols-2 place-items-center rounded bg-eerie_black p-2"
                    >
                        {team_key}
                        <div
                            class="size-6 rounded-full bg-{color === 'red'
                                ? 'bittersweet'
                                : 'steel_blue'}"
                        ></div>
                    </div>
                {/each}
                {#each pending_team_matches.value as { team_key, color, scout, displaying_tk }, i}
                    <button
                        class="grid h-12 grid-cols-2 place-items-center rounded bg-crayola_orange p-2"
                        onclick={() =>
                            (pending_team_matches.value[i].displaying_tk =
                                !displaying_tk)}
                    >
                        {#if displaying_tk}
                            {team_key}
                        {:else}
                            {scout}
                        {/if}
                        <div
                            class="size-6 rounded-full bg-{color === 'red'
                                ? 'bittersweet'
                                : 'steel_blue'}"
                        ></div>
                    </button>
                {/each}
                {#each submitted_team_matches.value as team_match, i}
                    <button
                        class="grid h-12 grid-cols-2 place-items-center rounded bg-jungle_green p-2 text-center"
                        onclick={() =>
                            (submitted_team_matches.value[i].displaying_tmk =
                                !team_match.displaying_tmk)}
                    >
                        {#if team_match.displaying_tmk}
                            {team_match.team_key}
                        {:else}
                            {team_match.scout_username}
                        {/if}
                        <div
                            class="size-6 rounded-full bg-{team_match.color ===
                            'red'
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
            {#each past_team_matches.value as team_match, i}
                <button
                    class="grid h-12 grid-cols-1 place-items-center rounded bg-jungle_green p-2 text-center"
                    onclick={() =>
                        (past_team_matches.value[i].displaying_tmk =
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
                pending_team_matches.value = []
                past_team_matches.value = []
            }}>Clear Past Matches</button
        ><button class="rounded bg-eerie_black" onclick={update_team_matches}
            >Verify Data TBA</button
        >
    </div>
</div>
