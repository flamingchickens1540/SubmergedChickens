<script lang="ts">
    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { localStore } from "@/localStore.svelte"
    import { io, Socket } from "socket.io-client"
    import { onDestroy } from "svelte"

    const username = $state(localStore("username", ""))
    let got_robot = $state(false)
    let socket: Socket = io({
        auth: {
            username: username.value,
        },
    })

    socket.on("connect", () => {
        socket.emit("join_queue")
    })

    socket.on(
        "time_to_scout",
        ([match_key, { team_key, color }]: [
            string,
            { team_key: string; color: "red" | "blue" },
        ]) => {
            browser && localStorage.setItem("match_data", "")
            goto(
                `/match-scout?match=${match_key}&team=${team_key}&color=${color}`
            )
        }
    )

    socket.on("scout_left_queue", (scout: string) => {
        if (scout === username.value) {
            goto("/")
        }
    })

    const leave = () => {
        socket.emit("leave_scout_queue", username.value)
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
