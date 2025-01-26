<script lang="ts">
    import type { AutoAction, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoAction
    } = $props()

    const processor = () => {
        action_state = "ScoreAlgaeProcessor"
        page_state = "Verify"
    }
    const net = () => {
        action_state = "ScoreAlgaeProcessor"
        page_state = "Verify"
    }
    const cancel = () => {
        action_state = "None"
        page_state = "None"
    }
</script>

<div class="grid gap-2 flex-grow">
    <button class="rounded bg-gunmetal" onclick={processor}>
        Processor
    </button>
    <button class="rounded bg-gunmetal" onclick={net}> Net </button>
</div>
<button
    class="py-4 rounded bg-gunmetal"
    onclick={cancel}>Cancel</button
>
