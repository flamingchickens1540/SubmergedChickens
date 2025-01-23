<script lang="ts">
    import type { AutoActionData } from '$lib/types';
    import { X } from 'lucide-svelte';

    let {
        action_data = $bindable(),
        index,
        remove
    }: {
        action_data: AutoActionData;
        index: number;
        remove: (index: number) => void;
    } = $props();

    let color = $derived(
        action_data.success
            ? 'bg-jungle_green/50 shadow-jungle_green/10'
            : 'bg-flaming_red/50 shadow-flaming_red/10'
    );
</script>

<div
    class="group flex flex-row content-center justify-between {color} w-full rounded p-2 text-white shadow-lg"
>
    <span class="w-auto shrink text-clip">{action_data.action}</span>
    <div class="flex shrink-0 flex-row content-center justify-end gap-4">
        <button onclick={() => remove(index)}>
            <X />
        </button>
    </div>
</div>

