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

    const l1 = () => {
        action_state = "ScoreCoralL1"
        page_state = "Verify"
    }
    const l2 = () => {
        action_state = "ScoreCoralL2"
        page_state = "Verify"
    }
    const l3 = () => {
        action_state = "ScoreCoralL3"
        page_state = "Verify"
    }
    const l4 = () => {
        action_state = "ScoreCoralL4"
        page_state = "Verify"
    }
    const cancel = () => {
        action_state = null
        page_state = "None"
    }
</script>

<div class="grid flex-grow gap-2">
    <button onclick={l4} class="rounded {bg_color}">L4</button>
    <button onclick={l3} class="rounded {bg_color}">L3</button>
    <button onclick={l2} class="rounded {bg_color}">L2</button>
    <button onclick={l1} class="rounded {bg_color}">L1</button>
</div>
<button class="rounded bg-gunmetal py-4" onclick={cancel}>Cancel</button>
