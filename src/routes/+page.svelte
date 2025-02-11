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

    socket.on("allowed_user", () => {
        browser && window.localStorage.setItem("username", inputname)
        goto("/home")
    })
</script>

<h1 class="pt-6 text-center text-5xl font-bold text-white">
    Inflated Chickens :3
</h1>
<div class="mt-16 grid w-full grid-flow-col grid-cols-1 grid-rows-2 gap-4">
    <div class="m-4 grid grid-cols-1 place-items-center gap-4">
        {#if !waiting}
            <input
                class="rounded border-2 border-solid px-4 py-2 text-black"
                type="text"
                placeholder="Please enter your name here"
                bind:value={inputname}
            />
            <button
                class="text-l rounded bg-gunmetal px-4 py-2 text-center text-white
            {inputname === '' ? 'pointer-events-none text-white/50' : ''}"
                onclick={login}
            >
                Login
            </button>
        {:else}
            <div>Waiting for approval</div>
        {/if}
    </div>
</div>
