<script lang="ts">
    import type { ActionState, PageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: PageState
        action_state: ActionState
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

<div class="m-2 grid grid-cols-1 grid-rows-3 place-items-center gap-2">
    <button onclick={l2} class="h-44 w-80 rounded bg-gunmetal">L2</button>
    <button onclick={l3} class="h-44 w-80 rounded bg-gunmetal">L3</button>

    <button
        class="grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
