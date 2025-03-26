<script lang="ts">
    import {
        type CurrentTeamMatch,
        type SubmittedTeamMatch,
        type UncountedTeamMatch,
    } from "@/types"
    import type { Socket } from "socket.io-client"

    let {
        socket = $bindable(),
        current_robots = $bindable(),
        submitted_team_matches = $bindable(),
    }: {
        socket: Socket
        current_robots: CurrentTeamMatch[]
        submitted_team_matches: SubmittedTeamMatch[]
    } = $props()

    socket.on("new_team_match", (team_match: UncountedTeamMatch) => {
        const submitted: CurrentTeamMatch | undefined = current_robots.find(
            robot => parseInt(robot.team_key) === team_match.team_key
        )
        if (submitted !== undefined) {
            submitted.tm_status = "Submitted"
        }
        submitted_team_matches.unshift({
            ...team_match,
            scout_username: submitted?.scout,
            displaying_tk: true,
        })
    })
    socket.on("robot_left_queue", ({ team_data, scout }) => {
        const scout_index = scout_queue.indexOf(scout)
        if (scout_index !== -1) scout_queue.splice(scout_index, 1)

        const sent_robot = current_robots.value.find(
            (robot: CurrentTeamMatch) => robot.team_key === team_data.team_key
        )
        if (!sent_robot) return
        sent_robot!.tm_status = "Pending"
        sent_robot.scout = scout
    })

    // socket.on(
    //     "robot_left_queue",
    //     ({
    //         team_data,
    //         scout: _,
    //     }: {
    //         team_data: { team_key: string; color: string }
    //         scout: string
    //     }) => {
    //         const team_match: CurrentTeamMatch | undefined =
    //             current_robots.find(robot => {
    //                 robot.team_key === team_data.team_key
    //             })
    //         if (!team_match) return
    //
    //         team_match.tm_status = "Pending"
    //     }
    // )
</script>

<div class="col-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
    <span class="col-span-3 text-center">Current Robots</span>
    <div class="grid max-h-28 grid-cols-3 gap-2">
        {#each current_robots as { team_key, color, scout, displaying_tk, tm_status }, i}
            <button
                class="grid h-12 grid-cols-2 place-items-center rounded {tm_status ==
                'Pending'
                    ? 'bg-crayola_orange'
                    : tm_status == 'Submitted'
                      ? 'bg-jungle_green'
                      : 'bg-eerie_black'} p-2"
                onclick={() => {
                    if (
                        (tm_status == "Pending" || tm_status == "Submitted") &&
                        scout?.length
                    ) {
                        current_robots[i].displaying_tk = !displaying_tk
                    }
                }}
                >{#if tm_status != "Removed"}
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
                {/if}
            </button>
        {/each}
    </div>
</div>
