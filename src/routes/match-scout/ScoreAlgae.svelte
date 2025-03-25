<script lang="ts">
    import type { AutoPageState } from "$lib/types"
    import type { AutoAction } from "@prisma/client"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
        bg_color,
    }: {
        page_state: AutoPageState
        action_state: AutoAction | null
        bg_color: string
    } = $props()

    const processor = () => {
        action_state = "ScoreAlgaeProcessor"
        page_state = "Verify"
    }
    const net = () => {
        action_state = "ScoreAlgaeNet"
        page_state = "Verify"
    }
    const cancel = () => {
        action_state = null
        page_state = "None"
    }
</script>

<div class="grid flex-grow gap-2">
    <button class="rounded {bg_color}" onclick={processor}> Processor </button>
    <button class="rounded {bg_color}" onclick={net}> Net </button>
</div>
<button class="rounded bg-gunmetal py-4" onclick={cancel}>Cancel</button>
