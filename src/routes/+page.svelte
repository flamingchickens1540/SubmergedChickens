<script lang="ts">
    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"
    import { io, Socket } from "socket.io-client"
    import { LocalStore, localStore } from "@/localStore.svelte"

    let username: LocalStore<string> = $state(localStore("username", ""))
    let waiting = $state(false)

    onMount(() => {
        const isLoggedIn = username.value != ""

        if (isLoggedIn) {
            socket.emit("new_user", username.value)
            goto("/home")
        }
    })

    async function login() {
        socket.emit("new_user", username.value)

        const res = await fetch(`/api/newUser/`, {
            method: "POST",
            body: JSON.stringify({
                username: username.value,
                is_admin: false,
            }),
        })
        if (!res.ok) return

        const id = await res.json()
        browser && window.localStorage.setItem("scout_id", id)

        goto("/home")
    }

    let socket: Socket = io({ auth: { username: "" } })
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
                bind:value={username.value}
            />
            <button
                class="text-l rounded bg-gunmetal px-4 py-2 text-center disabled:text-white/50"
                onclick={login}
                disabled={username.value === ""}
            >
                Login
            </button>
        {:else}
            <div>Waiting for approval</div>
        {/if}
    </div>
</div>
