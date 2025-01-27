<script lang="ts">
    import { X, Check } from "lucide-svelte"
    import { io, Socket } from "socket.io-client"
    import { Progress } from "$lib/components/ui/progress/index.js"
    // import { SubmittedMatch } from "$lib/types.ts"
    import Modal from "./Modal.svelte"

    let next_match_key = $state("")

    let next_red_robots = $state(["", "", ""])
    let next_blue_robots = $state(["", "", ""])

    let curr_red_robots = $state(["", "", ""])
    let curr_blue_robots = $state(["", "", ""])

    let new_users: string[] = $state(["xxxxxxxx", "xxx", "xxxxxxxx"])
    let scout_queue: string[] = $state(["yyyy", "yyyyyyyy"])
    // TODO change to actual type
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

    const percent_team_matches_submitted = $state(36)
</script>

<div
    class="m-auto grid max-w-5xl grid-cols-2 grid-rows-4 gap-2 p-2 text-white sm:grid-cols-5 sm:gap-4"
>
    <div class="col-span-2 row-span-2 grid grid-cols-subgrid grid-rows-subgrid">
        <div class="col-span-2 grid grid-cols-3 gap-2 rounded bg-gunmetal p-2">
            <input
                bind:value={next_match_key}
                placeholder="Next Match"
                class="rounded bg-eerie_black p-2"
            />
            <button class="rounded bg-eerie_black p-2" onclick={auto_load_teams}
                >Auto Load</button
            >
            <button onclick={queue_match} class="rounded bg-eerie_black p-2"
                >Queue Match</button
            >
            {#each next_red_robots as _robot, i}
                <input
                    bind:value={next_red_robots[i]}
                    class="rounded bg-bittersweet p-2"
                />
            {/each}
            {#each next_blue_robots as _robot, i}
                <input
                    bind:value={next_blue_robots[i]}
                    class="rounded bg-steel_blue p-2"
                />
            {/each}
        </div>
        <div class="col-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
            <span class="col-span-3 text-center">Currently Scouting</span>
            <div class="grid flex-grow grid-cols-3 grid-rows-2 gap-2">
                {#each curr_red_robots as robot}
                    <div class="rounded bg-bittersweet p-2">{robot}</div>
                {/each}
                {#each curr_blue_robots as robot}
                    <div class="rounded bg-steel_blue p-2">{robot}</div>
                {/each}
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-2 rounded bg-gunmetal p-2 sm:row-span-2">
        <span class="text-center">New Users</span>
        {#each new_users as user}
            <div
                class="flex items-center justify-between rounded bg-eerie_black p-1"
            >
                {user}
                <button
                    class="rounded bg-gunmetal p-1"
                    onclick={() => approve_new_user(user)}><Check /></button
                >
            </div>
        {/each}
    </div>
    <div class="flex flex-col gap-2 rounded bg-gunmetal p-2 sm:row-span-2">
        <span class="text-center">Queue</span>
        {#each scout_queue as scout}
            <div
                class="black flex items-center justify-between rounded bg-eerie_black p-1"
            >
                {scout}
                <button
                    onclick={() => remove_scout(scout)}
                    class="rounded bg-gunmetal p-1"><X /></button
                >
            </div>
        {/each}
    </div>
    <div class="row-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
        <span class="text-center">Submitted Team Matches</span>
        {#each submitted_team_matches as team_match}
            <button
                class="black flex items-center justify-between rounded bg-eerie_black px-1 py-2"
            >
                {team_match}
            </button>
        {/each}
    </div>
    <div class="flex flex-col gap-2 rounded bg-gunmetal p-2">
        <span class="text-center">Team Matches Submitted</span>
        <div class="h-4 w-full rounded-full bg-eerie_black">
            <div
                class="h-4 rounded-full bg-xanthous"
                style="width: {percent_team_matches_submitted}%"
            ></div>
        </div>
    </div>
</div>
