<script lang="ts">
    import Drawer from "$lib/components/Drawer.svelte"
    import { FlaskRound, LogOut, Settings } from "lucide-svelte"
    import { goto } from "$app/navigation"
    import { browser } from "$app/environment"
    import { onMount } from "svelte"

    let name = $state("Hello")

    onMount(() => {
        let username = ((browser && localStorage.getItem("username")) ??
            "scout") as string
        const first = username.charAt(0).toUpperCase()
        name = "Hello " + first + username.slice(1)
    })

    let bugReportVisible = $state(false)
</script>

<div class="flex w-full flex-col gap-2 p-2">
    <div class="flex w-full items-center justify-between gap-2">
        <button class="rounded p-1"><LogOut /></button>
        <span class="font-semibold">{name}</span>
        <button class="rounded p-1"><Settings /></button>
    </div>
    <div class="grid gap-2 text-xl font-semibold">
        <button
            class="rounded bg-gunmetal p-2"
            onclick={() => {
                goto("pit-view")
            }}>Pit Display</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            onclick={() => {
                goto("pit-scout/teamlist") // Guessing teamlist is where you choose the team to pit scout?
            }}>Pit Scout</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            onclick={() => {
                goto("queue")
            }}>Match Scout</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            onclick={() => {
                goto("analysis")
            }}>Analysis</button
        >
        <button
            class="rounded bg-gunmetal p-2"
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
