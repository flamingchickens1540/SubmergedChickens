<script lang="ts">
    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"
    import { io, Socket } from "socket.io-client"

    let inputname: string = $state("")
    let waiting = $state(false)

    const placeholder_username = `new_user_${Math.random()}`

    onMount(() => {
        const isLoggedIn = browser && window.localStorage.getItem("username")
        if (isLoggedIn) {
            goto("/home")
        }
    })

    function login() {
        socket.emit("new_user", placeholder_username, inputname)
        waiting = true
    }

    let socket: Socket = io({
        auth: {
            username: placeholder_username,
        },
    })

    socket.on("allowed_user", async () => {
        console.log("allowed")
        browser && window.localStorage.setItem("username", inputname)

        const res = await fetch(`/api/newUser/`, {
            method: "POST",
            body: JSON.stringify({
                username: inputname,
                is_admin: false,
            }),
        })
        if (!res.ok) return
        const id = await res.json()
        console.log(id)

        browser && window.localStorage.setItem("scout_id", id)

        goto("/home")
    })
</script>

<div class="flex flex-col justify-center gap-8 p-6">
    <h1 class="text-center text-4xl font-bold text-white">
        Submerged Chickens :3
    </h1>
    <div class="m-4 grid grid-cols-1 place-items-center gap-4">
        {#if !waiting}
            <input
                class="rounded border-gunmetal bg-gunmetal p-2 shadow-inner"
                type="text"
                placeholder="Please enter your name here"
                bind:value={inputname}
            />
            <button
                class="text-l rounded bg-gunmetal px-4 py-2 text-center disabled:text-white/50"
                onclick={login}
                disabled={inputname === ""}
            >
                Login
            </button>
        {:else}
            <div>Waiting for approval</div>
        {/if}
    </div>
</div>
