<script lang="ts">
    import { X } from "lucide-svelte"
    import { io, Socket } from "socket.io-client"
    import { Progress } from "$lib/components/ui/progress/index.js"
    // import { SubmittedMatch } from "$lib/types.ts"
    import Modal from "./Modal.svelte"

    let next_match_key = $state("")

    let next_red_robots = $state(["", "", ""])
    let next_blue_robots = $state(["", "", ""])

    let curr_red_robots = $state(["", "", ""])
    let curr_blue_robots = $state(["", "", ""])

    let new_users: string[] = $state([])
    let scout_queue: string[] = $state([])
    // TODO change to actual typeadmin
    let submitted_team_matches: string[] = $state(["qm14:1540"])

    let socket: Socket = io({
        auth: {
            token: "celary",
            username: "admin",
        },
    })

    socket.emit("get_scout_queue", (response: { scouts: string[] }) => {
        scout_queue = response.scouts
    })

    socket.emit("get_new_user_queue", (response: { users: string[] }) => {
        new_users = response.users
    })

    socket.on("scout_joined_queue", (scout: string) => {
        scout_queue.push(scout)
    })

    socket.on("scout_left_queue", (scout: string) => {
        const index = scout_queue.indexOf(scout)
        if (index === -1) return

        scout_queue.splice(index, 1)
    })

    socket.on("new_user_request", (user: string) => {
        new_users.push(user)
    })

    const queue_match = async () => {
        // NOTE robot == "" gets filted out on the backend so color is preserved through index
        let next_robots = [...next_red_robots, ...next_red_robots]
        // TODO next_robots.toReversed().forEach((team_key, i) =>
        //     team_matches.value.push({
        //         status: "pending",
        //         team_match_key: `${next_match_key} ${team_key}`,
        //         color: team_color[i][1],
        //         timeline: null,
        //     })
        // )
        socket.emit("send_match", [next_match_key, next_robots])

        await fetch("/api/newmatch", {
            method: "POST",
            body: JSON.stringify(next_match_key),
            headers: {
                "Content-Type": "application/json",
            },
        })

        next_match_key = ""
        next_red_robots = ["", "", ""]
        next_blue_robots = ["", "", ""]

        curr_red_robots = next_robots.slice(0, 2)
        curr_blue_robots = next_robots.slice(3, 7)
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

    const auto_load_teams = () => {}
    const approve_new_user = (user: string) => {
        const i = new_users.indexOf(user)
        if (i === -1) return
        new_users.splice(i, 1)

        socket.emit("approve_new_user", user)
    }

    const percent_team_matches_submitted = $state(36)
</script>

<div
    class="ml-2 mr-2 mt-2 grid grid-flow-col grid-cols-1 grid-rows-2 gap-4 text-white"
>
    <div class="grid grid-flow-col grid-cols-5 grid-rows-2 gap-4">
        <div
            class="col-span-2 grid grid-cols-1 grid-rows-3 gap-2 rounded bg-black p-2"
        >
            <div class="grid grid-cols-3 grid-rows-1 gap-2">
                <input
                    bind:value={next_match_key}
                    placeholder="Next Match"
                    class="rounded bg-gunmetal p-2"
                />
                <button
                    class="rounded bg-gunmetal p-2"
                    onclick={auto_load_teams}>Auto Load</button
                >
                <button onclick={queue_match} class="rounded bg-gunmetal p-2"
                    >Queue Match</button
                >
            </div>
            <div class="grid grid-cols-3 grid-rows-1 gap-2 text-black">
                {#each next_red_robots as _robot, i}
                    <input
                        bind:value={next_red_robots[i]}
                        class="rounded bg-red-500 p-2"
                    />
                {/each}
            </div>
            <div class="grid grid-cols-3 grid-rows-1 gap-2 text-black">
                {#each next_blue_robots as _robot, i}
                    <input
                        bind:value={next_blue_robots[i]}
                        class="rounded bg-blue-500 p-2"
                    />
                {/each}
            </div>
        </div>
        <div
            class="col-span-2 grid grid-cols-1 grid-rows-3 gap-2 rounded bg-black p-2"
        >
            <div class="grid place-content-center rounded bg-gunmetal p-2">
                Currently Scouting
            </div>
            <div class="grid grid-cols-3 grid-rows-1 gap-2 text-black">
                {#each curr_red_robots as robot}
                    <div class="rounded bg-red-500 p-2">{robot}</div>
                {/each}
            </div>
            <div class="grid grid-cols-3 grid-rows-1 gap-2 text-black">
                {#each curr_blue_robots as robot}
                    <div class="rounded bg-blue-500 p-2">{robot}</div>
                {/each}
            </div>
        </div>
        <div
            class="row-span-2 grid h-96 max-h-96 gap-2 overflow-y-scroll rounded bg-black p-2 text-center"
        >
            <div class="text-center">New Users</div>
            <div class="grid h-80 gap-2">
                {#each new_users as user}
                    <div class="grid h-10 grid-cols-2 gap-4 bg-gunmetal">
                        <div class="grid place-items-center">{user}</div>
                        <button
                            class="rounded bg-gunmetal p-2"
                            onclick={() => approve_new_user(user)}
                            >Approve</button
                        >
                    </div>
                {/each}
            </div>
        </div>
        <div
            class="row-span-2 grid h-96 max-h-96 gap-2 overflow-y-scroll rounded bg-black p-2 text-center"
        >
            <div>Queue</div>
            <div class="grid h-80 gap-2">
                {#each scout_queue as scout}
                    <div
                        class="grid h-10 grid-cols-6 place-items-baseline items-center rounded bg-gunmetal p-2"
                    >
                        <div class="col-span-5 grid place-items-center">
                            {scout}
                        </div>
                        <button
                            onclick={() => remove_scout(scout)}
                            class="grid h-4 w-4 place-content-center rounded bg-red-500 p-3"
                            ><X /></button
                        >
                    </div>
                {/each}
            </div>
        </div>
        <div
            class="row-span-2 grid h-96 max-h-96 gap-2 overflow-y-scroll rounded bg-black p-2 text-center"
        >
            <div>Submitted Team Matches</div>
            <div class="grid h-80 gap-2">
                {#each submitted_team_matches as team_match}
                    <div
                        class="grid h-10 grid-cols-6 place-items-baseline items-center rounded bg-gunmetal p-2"
                    >
                        <button class="col-span-5 grid place-items-center">
                            {team_match}
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <!-- <div class="grid grid-cols-5 grid-rows-2 gap-2 rounded"> -->
    <!--     <div class="cols-span-2 m-2 grid grid-rows-5 rounded bg-black p-2"> -->
    <!--         <div class="row-span-1">Team Matches Submitted</div> -->
    <!--         <Progress -->
    <!--             style="" -->
    <!--             value={percent_team_matches_submitted} -->
    <!--             max={100} -->
    <!--             class="w-full bg-white" -->
    <!--         /> -->
    <!--     </div> -->
    <!-- </div> -->
</div>
