<script lang="ts">
    import Drawer from "$lib/components/Drawer.svelte"
    import { LogOut, Settings } from "lucide-svelte"
    import { goto } from "$app/navigation"
    import { browser } from "$app/environment"
    import { onMount } from "svelte"
    import type { PageData } from "./$types"

    // TODO Decide if we want to display the current match
    const data: PageData = $props()

    let greeting = $state("Hello")

    onMount(() => {
        browser && localStorage.setItem("event_key", data.event_key)

        let username = ((browser && localStorage.getItem("username")) ??
            "scout") as string
        const first = username.charAt(0).toUpperCase()
        greeting = "Hello " + first + username.slice(1)
    })

    let bugReportVisible = $state(false)

    const logout = () => {
        localStorage.removeItem("username")
        goto("/")
    }
</script>

<div class="flex flex-col gap-4 p-2">
    <div class="flex w-full items-center justify-between gap-2">
        <button class="rounded p-1" onclick={logout}><LogOut /></button>
        <span class="font-semibold">{greeting}</span>

        <button class="rounded p-1"><Settings /></button>
    </div>
    <div class="grid gap-2 text-xl font-semibold">
        <button
            class="rounded bg-gunmetal p-2 disabled:opacity-30"
            disabled
            onclick={() => {
                goto("pit-view")
            }}>Pit Display</button
        >
        <button
            class="rounded bg-gunmetal p-2 disabled:opacity-30"
            disabled
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
            disabled
            onclick={() => {
                goto("analysis")
            }}>Analysis</button
        >
        <button
            class="rounded bg-gunmetal p-2 disabled:opacity-30"
            onclick={() => {
                bugReportVisible = !bugReportVisible
            }}>Bug Report</button
        >
    </div>
    <Drawer bind:displaying={bugReportVisible} bg="bg-gunmetal">
        <textarea
            class="w-full flex-grow rounded bg-eerie_black p-1"
            placeholder="Bug Description"
        ></textarea>
        <button class="w-full rounded bg-eerie_black p-2 font-bold"
            >Submit</button
        >
    </Drawer>
</div>
