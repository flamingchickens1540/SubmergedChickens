<script lang="ts">
    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { io, Socket } from "socket.io-client"

    const username = browser && localStorage.getItem("username")
    let socket: Socket = io({
        auth: {
            username,
        },
    })

    socket.on("connect", () => {
        socket.emit("join_queue")
    })

    socket.on(
        "time_to_scout",
        ([match_key, team_key, color]: [string, string, "red" | "blue"]) => {
            goto(
                `/match-scout/prematch?match=${match_key}&team=${team_key}&color=${color}`
            )
        }
    )

    socket.on("scout_left_queue", (scout: string) => {
        if (scout === username) {
            goto("/")
        }
    })

    const leave = () => {
        socket.emit("leave_scout_queue", username)
        goto("/")
    }
</script>

<div class="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
    <h1 class="font-heading p-2 text-5xl font-bold text-yellow-400">
        In Queue
    </h1>

    <button
        class="rounded bg-gunmetal px-4 py-2 text-center text-xl"
        onclick={leave}>Leave Queue</button
    >
</div>
