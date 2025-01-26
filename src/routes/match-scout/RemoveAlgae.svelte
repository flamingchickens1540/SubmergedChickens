<script lang="ts">
    import type { AutoAction, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoAction
    } = $props()

    const l2 = () => {
        action_state = "RemoveAlgaeL2"
        page_state = "Verify"
    }
    const l3 = () => {
        action_state = "RemoveAlgaeL3"
        page_state = "Verify"
    }
    const cancel = () => {
        action_state = "None"
        page_state = "None"
    }
</script>

<div class="grid flex-grow gap-2">
    <button onclick={l2} class="rounded bg-gunmetal">L2</button>
    <button onclick={l3} class="rounded bg-gunmetal">L3</button>
</div>

<button
    class="py-4 rounded bg-gunmetal"
    onclick={cancel}>Cancel</button
>
