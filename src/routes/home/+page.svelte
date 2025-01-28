<script lang="ts">
    import Drawer from "$lib/components/Drawer.svelte"
    import { FlaskRound, LogOut, Settings } from "lucide-svelte"
    import { goto } from "$app/navigation"

    let name = "<insert name>"

    let bugReportVisible = false
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
            on:click={() => {
                goto("pit-display")
            }}>Pit Display</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            on:click={() => {
                goto("qual-scout")
            }}>Pit Scout</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            on:click={() => {
                goto("match-scout/prematch")
            }}>Match Scout</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            on:click={() => {
                goto("admin")
            }}>Admin</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            on:click={() => {
                goto("analysis")
            }}>Analysis</button
        >
        <button
            class="rounded bg-gunmetal p-2"
            on:click={() => {
                bugReportVisible = !bugReportVisible
            }}>Bug Report</button
        >
    </div>
    <Drawer bind:displaying={bugReportVisible}>
        <textarea
            class="w-full flex-grow rounded bg-eerie_black p-1"
            placeholder="bug description"
        ></textarea>
        <button class="w-full rounded bg-eerie_black p-2 font-bold"
            >Submit</button
        >
    </Drawer>
</div>
