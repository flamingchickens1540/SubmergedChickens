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

    const l2 = () => {
        action_state = "CleanAlgaeL2"
        page_state = "Verify"
    }
    const l3 = () => {
        action_state = "CleanAlgaeL3"
        page_state = "Verify"
    }
    const cancel = () => {
        action_state = null
        page_state = "None"
    }
</script>

<div class="grid flex-grow gap-2">
    <button onclick={l3} class="rounded {bg_color}">L3</button>
    <button onclick={l2} class="rounded {bg_color}">L2</button>
</div>

<button class="rounded bg-gunmetal py-4" onclick={cancel}>Cancel</button>
