<script lang="ts">
    import { LogOut, Settings } from "lucide-svelte"
    import { goto } from "$app/navigation"

    let name = "<insert name>"
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
                goto("" /* TODO: link to match scout */)
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
        <button class="rounded bg-gunmetal p-2">Bug Report</button>
    </div>
</div>
