<script lang="ts">
    import { X, Check } from "lucide-svelte"
    import { io, Socket } from "socket.io-client"
    import { localStore } from "@/localStore.svelte"

    let next_match_key = $state(localStore<string>("next_match_key", ""))

    let next_red_robots = $state(
        localStore<string[]>("next_red_robots", ["", "", ""])
    )
    let next_blue_robots = $state(
        localStore<string[]>("next_blue_robots", ["", "", ""])
    )

    let curr_red_robots = $state(
        localStore<string[]>("curr_red_robots", ["", "", ""])
    )
    let curr_blue_robots = $state(
        localStore<string[]>("curr_blue_robots", ["", "", ""])
    )

    let new_users: string[] = $state([])
    let scout_queue: string[] = $state([])
    // TODO Change to actual type
    // TODO Pull from backend
    let submitted_team_matches: string[] = $state([])

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
        let next_robots = [
            ...next_red_robots.value.map(team => [team, "red"]),
            ...next_blue_robots.value.map(team => [team, "blue"]),
        ]

        socket.emit("send_match", [next_match_key.value, next_robots])

        curr_red_robots.value = next_red_robots.value
        curr_blue_robots.value = next_blue_robots.value

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

    const auto_load_teams = () => {}
    const approve_new_user = (user: string) => {
        const i = new_users.indexOf(user)
        if (i === -1) return
        new_users.splice(i, 1)

        socket.emit("approve_new_user", user)
    }
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
            <span class="col-span-3 text-center">Currently Playing</span>
            <div class="grid flex-grow grid-cols-3 grid-rows-2 gap-2">
                {#each curr_red_robots.value as robot}
                    <div class="rounded bg-bittersweet p-2">{robot}</div>
                {/each}
                {#each curr_blue_robots.value as robot}
                    <div class="rounded bg-steel_blue p-2">{robot}</div>
                {/each}
            </div>
        </div>
    </div>
    <div
        class="row-span-2 flex max-h-96 flex-col gap-2 rounded bg-gunmetal p-2"
    >
        <span class="text-center">New Users</span>
        <div class="flex flex-col gap-2 overflow-auto">
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
    </div>
    <div
        class="row-span-2 flex max-h-96 flex-col gap-2 rounded bg-gunmetal p-2"
    >
        <span class="text-center">Queue</span>
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
    <div
        class="row-span-2 flex max-h-96 flex-col gap-2 rounded bg-gunmetal p-2"
    >
        <span class="text-center">Submitted Team Matches</span>
        <div class="flex flex-col gap-2 overflow-auto">
            {#each submitted_team_matches as team_match}
                <button
                    class="flex items-center justify-between rounded bg-eerie_black px-1 py-2"
                >
                    {team_match}
                </button>
            {/each}
        </div>
    </div>
</div>
