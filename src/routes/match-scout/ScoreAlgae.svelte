<script lang="ts">
    import type { AutoActionState, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoActionState
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

<div class="m-2 grid grid-cols-1 grid-rows-3 place-items-center gap-2">
    <button class="h-44 w-80 rounded bg-gunmetal" onclick={processor}>
        Processor
    </button>
    <button class="h-44 w-80 rounded bg-gunmetal" onclick={net}> Net </button>

    <button
        class="grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
