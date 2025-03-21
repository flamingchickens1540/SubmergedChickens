<script lang="ts">
    import type { FrontendAutoActionData } from "$lib/types"
    import { X } from "lucide-svelte"

    let {
        action_data = $bindable(),
        index,
        remove,
    }: {
        action_data: FrontendAutoActionData
        index: number
        remove: (index: number) => void
    } = $props()

    let color = $derived(
        action_data.action == "Incap"
            ? "bg-crayola_orange/50"
            : action_data.success
              ? "bg-jungle_green/50"
              : "bg-imperial_red/50"
    )
    // NOTE This is redundant in the case of auto but not in the case of tele
    // The only other way to do this is to pass what sub_timeline it's in as well
</script>

<div
    class="group flex flex-row content-center justify-between {color} w-full rounded p-2 text-white"
>
    <span class="w-auto shrink text-clip">{action_data.action}</span>
    <div class="flex shrink-0 flex-row content-center justify-end gap-4">
        <button onclick={() => remove(index)}>
            <X />
        </button>
    </div>
</div>
