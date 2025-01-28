<script lang="ts">
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
    <footer
        class=" {bugReportVisible
            ? ''
            : 'hidden'} no-scrollbar absolute inset-x-0 bottom-0 flex min-h-[30svh] max-h-[80svh] w-dvw flex-col items-center gap-3 overflow-y-scroll rounded-t-lg bg-gunmetal p-3 text-white"
    >
        <textarea
            class="min-h-36 w-full rounded bg-eerie_black p-1"
            placeholder="bug description"
        ></textarea>
        <button class="mt-auto w-full rounded bg-gunmetal p-2 font-bold"
            >Submit</button
        >
    </footer>
</div>
