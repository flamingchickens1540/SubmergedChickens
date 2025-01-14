<script lang="ts">
    import { LogOut, Settings } from "lucide-svelte"

    let name = "<insert name>"
</script>

<div class="flex w-full flex-col gap-2 p-2">
    <div class="flex w-full items-center justify-between gap-2">
        <button class="rounded bg-zinc-300 p-1"><LogOut /></button>
        <span class="font-semibold">{name}</span>
        <button class="rounded bg-zinc-300 p-1"><Settings /></button>
    </div>
    <div class="grid gap-2 text-xl font-semibold">
        <button class="rounded bg-zinc-300 p-2">Pit Display</button>
        <button class="rounded bg-zinc-300 p-2">Pit Scout</button>
        <button class="rounded bg-zinc-300 p-2">Match Scout</button>
        <button class="rounded bg-zinc-300 p-2">Admin</button>
        <button class="rounded bg-zinc-300 p-2">Analysis</button>
        <button class="rounded bg-zinc-300 p-2">Bug Report</button>
    </div>
</div>
