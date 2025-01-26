<script lang="ts">
    import type { AutoActionData } from "$lib/types"
    import { MoveUp, MoveDown, X } from "lucide-svelte"

    let {
        action_data = $bindable(),
        index,
        shift,
        remove,
    }: {
        action_data: AutoActionData
        index: number
        shift: (index: number, change: -1 | 1) => void
        remove: (index: number) => void
    } = $props()

    let color = $derived(
        action_data.action == "Incap"
            ? "bg-chicken_orange/50 shadow-chicken_orange/50"
            : action_data.success
              ? "bg-jungle_green/50 shadow-jungle_green/10"
              : "bg-flaming_red/50 shadow-flaming_red/10"
    )
</script>

<div
    class="group flex flex-row content-center justify-between {color} w-full rounded p-2 text-white shadow-lg"
>
    <span class="w-auto shrink text-clip">{action_data.action}</span>
    <div class="flex shrink-0 flex-row content-center justify-end gap-4">
        <button
            class="group-first:pointer-events-none group-first:opacity-30"
            onclick={() => shift(index, 1)}
        >
            <MoveUp />
        </button>
        <button
            class="group-last:pointer-events-none group-last:opacity-30"
            onclick={() => shift(index, -1)}
        >
            <MoveDown />
        </button>
        <button onclick={() => remove(index)}>
            <X />
        </button>
    </div>
</div>
