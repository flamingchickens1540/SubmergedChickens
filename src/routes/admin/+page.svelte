<script lang="ts">
    import { io, Socket } from "socket.io-client"
    import { LocalStore, localStore } from "@/localStore.svelte"
    import EventManager from "./EventManager.svelte"
    import type { PageProps } from "./$types"
    import type { CurrentTeamMatch, SubmittedTeamMatch } from "@/types"
    import NewMatch from "./NewMatch.svelte"
    import CurrentRobots from "./CurrentRobots.svelte"
    import ScoutQueue from "./ScoutQueue.svelte"
    import SubmittedRobots from "./SubmittedRobots.svelte"

    let { data }: PageProps = $props()
    const tba_event_keys = data.tba_event_keys

    let current_robots: LocalStore<CurrentTeamMatch[]> = $state(
        localStore("current_robots", [])
    )
    let submitted_team_matches: LocalStore<SubmittedTeamMatch[]> = $state(
        localStore("submitted_team_matches", [])
    )
    let next_match_key: LocalStore<string> = $state(
        localStore("next_match_key", "")
    )

    let scout_queue: string[] = $state([])

    let socket: Socket = $state(
        io({
            auth: {
                token: "celary",
                username: "Admin",
            },
        })
    )

    const update_team_matches = async () => {
        for (
            let i = 1;
            i < Number.parseInt(next_match_key.value.slice(2));
            i++
        ) {
            let match_key = "qm" + i.toString()
            await fetch(`/api/updateMatch`, {
                method: "PATCH",
                body: JSON.stringify(match_key),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }
    }

    function clear_robot_queue() {
        current_robots.value
            .filter(robot => robot.tm_status != "Pending")
            .forEach(robot => {
                socket.emit("leave_robot_queue", {
                    team_key: robot.team_key,
                    color: robot.color,
                })
            })

        current_robots.value.forEach(robot => {
            if (robot.tm_status != "Pending") {
                robot.tm_status = "Removed"
            }
        })
    }
    let event_selection = $state("Event Key")

    // svelte-ignore state_referenced_locally
    socket.on("robot_left_queue", ({ team_data, scout }) => {
        const scout_index = scout_queue.indexOf(scout)
        if (scout_index !== -1) scout_queue.splice(scout_index, 1)

        const sent_robot = current_robots.value.find(
            (robot: CurrentTeamMatch) => robot.team_key === team_data.team_key
        )
        if (!sent_robot) return
        sent_robot.tm_status = "Pending"
        sent_robot.scout = scout
    })
</script>

<div
    class="m-auto grid max-w-6xl select-none grid-cols-2 grid-rows-5 gap-2 p-2 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 md:grid-cols-5"
>
    <div class="col-span-2 row-span-2 grid grid-cols-subgrid grid-rows-subgrid">
        <NewMatch bind:socket bind:current_robots={current_robots.value} />
        <CurrentRobots
            bind:socket
            bind:current_robots={current_robots.value}
            bind:submitted_team_matches={submitted_team_matches.value}
            bind:scout_queue
        />
    </div>
    <ScoutQueue bind:socket bind:scout_queue />
    <SubmittedRobots
        bind:submitted_team_matches={submitted_team_matches.value}
    />
    <EventManager {tba_event_keys} bind:selection={event_selection} />
    <div class="grid gap-2 rounded bg-gunmetal p-2">
        <button class="rounded bg-eerie_black p-2" onclick={clear_robot_queue}
            >Clear Robot Queue</button
        >
        <button class="rounded bg-eerie_black p-2" onclick={update_team_matches}
            >Verify Data TBA</button
        >
    </div>
</div>
