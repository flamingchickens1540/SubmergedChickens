<script lang="ts">
    import { X } from "lucide-svelte"
    import { io, Socket } from "socket.io-client"
    // import { SubmittedMatch } from "$lib/types.ts"
    import Modal from "./Modal.svelte"

    let next_match_key = $state("")

    let next_red_robots = $state(["", "", ""])
    let next_blue_robots = $state(["", "", ""])

    let curr_red_robots = $state(["", "", ""])
    let curr_blue_robots = $state(["", "", ""])

    let new_users: string[] = $state([])

    let scout_queue: string[] = $state([])

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
        // TODO robot_queue = []
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
        curr_blue_robots = next_robots.slice(3, 6)
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
</script>

<div class="ml-2 mr-2 mt-2 grid grid-flow-col grid-cols-4 grid-rows-2 gap-4">
    <div
        class="col-span-2 grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline"
    >
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            <input
                bind:value={next_match_key}
                placeholder="Next Match"
                class="rounded p-2 outline"
            />
            <button class="rounded p-2 outline" onclick={auto_load_teams}
                >Auto Load</button
            >
            <button onclick={queue_match} class="rounded p-2 outline"
                >Queue Match</button
            >
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each next_red_robots as _robot, i}
                <input
                    bind:value={next_red_robots[i]}
                    class="rounded bg-red-500 p-2 outline"
                />
            {/each}
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each next_blue_robots as _robot, i}
                <input
                    bind:value={next_blue_robots[i]}
                    class="rounded bg-blue-500 p-2 outline"
                />
            {/each}
        </div>
    </div>
    <div
        class="col-span-2 grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline"
    >
        <button class="rounded p-2 outline">Currently Scouting</button>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each curr_red_robots as _robot, i}
                <input
                    bind:value={curr_red_robots[i]}
                    class="rounded bg-red-500 p-2 outline"
                />
            {/each}
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each curr_blue_robots as _robot, i}
                <input
                    bind:value={curr_blue_robots[i]}
                    class="rounded bg-blue-500 p-2 outline"
                />
            {/each}
        </div>
    </div>
    <div
        class="row-span-2 grid h-96 max-h-96 justify-items-center gap-2 overflow-y-scroll rounded p-2 text-center outline"
    >
        <div class="text-center">New Users</div>
        {#each new_users as user}
            <div class="grid h-10 grid-cols-2 gap-4">
                <div class="grid place-items-center">{user}</div>
                <button
                    class="rounded p-2 outline"
                    onclick={() => approve_new_user(user)}>Approve</button
                >
            </div>
        {/each}
    </div>
    <div
        class="row-span-2 grid h-96 max-h-96 gap-2 overflow-y-scroll rounded p-2 text-center outline"
    >
        <div>Queue</div>
        <div class="grid gap-2">
            {#each scout_queue as scout}
                <div
                    class="grid h-10 grid-cols-6 place-items-start items-center rounded p-2 outline"
                >
                    <div class="col-span-5 grid place-items-center">
                        {scout}
                    </div>
                    <button
                        onclick={() => remove_scout(scout)}
                        class="grid h-4 w-4 place-content-center rounded bg-red-500 p-3 outline"
                        ><X /></button
                    >
                </div>
            {/each}
        </div>
    </div>
</div>
