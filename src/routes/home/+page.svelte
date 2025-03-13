<script lang="ts">
    import Drawer from "$lib/components/Drawer.svelte"
    import { LogOut, Settings } from "lucide-svelte"
    import { goto } from "$app/navigation"
    import { localStore } from "@/localStore.svelte"
    import { browser } from "$app/environment"

    let username = $state(localStore("username", ""))

    if (username.value === "" && browser) {
        goto("/")
    }

    const logout = () => {
        username.reset()
        goto("/")
    }
</script>

<div class="flex h-dvh flex-col gap-4 p-2">
    <div class="flex w-full items-center justify-between gap-2">
        <button class="rounded p-1" onclick={logout}><LogOut /></button>
        <span class="text-xl font-semibold">Hello {username.value}</span>
        <button class="rounded p-1"><Settings /></button>
    </div>
    <div class="grid flex-grow gap-2 text-2xl font-semibold">
        <button
            class="rounded bg-gunmetal p-2 disabled:opacity-30"
            onclick={() => {
                goto("pit-scout/teamlist")
            }}>Pit Scout</button
        >
        <button
            class="rounded bg-gunmetal p-2 disabled:opacity-30"
            onclick={() => {
                goto("queue")
            }}>Match Scout</button
        >
        <button
            class="rounded bg-gunmetal p-2 disabled:opacity-30"
            onclick={() => {
                goto("manual")
            }}>Manual Match Scout</button
        >
        <button
            class="rounded bg-gunmetal p-2 disabled:opacity-30"
            disabled
            onclick={() => {
                goto("analysis")
            }}>Analysis</button
        >
    </div>
</div>
