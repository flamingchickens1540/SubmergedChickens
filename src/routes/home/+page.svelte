<script lang="ts">
    import { LogOut, Settings } from "lucide-svelte"

    let name = "<insert name>"
</script>

<div class="p-2 w-full gap-2 flex flex-col">
    <div class="flex w-full gap-2 justify-between items-center">
        <button class="p-1 bg-zinc-300 rounded"><LogOut /></button>
        <span class="font-semibold">{name}</span>
        <button class="p-1 bg-zinc-300 rounded"><Settings /></button>
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
