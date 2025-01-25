<script lang="ts">
    let {
        page_state = $bindable(),
    }: {
        page_state:
            | "ScoreAlgae"
            | "RemoveAlgae"
            | "ScoreCoral"
            | "Intake"
            | "Verify"
            | "None"
    } = $props()

    const l1 = () => (page_state = "Verify")
    const l2 = () => (page_state = "Verify")
    const l3 = () => (page_state = "Verify")
    const l4 = () => (page_state = "Verify")
    const cancel = () => (page_state = "None")
</script>

<div class="m-2 grid grid-cols-1 grid-rows-5 place-items-center gap-2">
    <button onclick={l1} class="h-36 w-80 rounded bg-gunmetal">L2</button>
    <button onclick={l2} class="h-36 w-80 rounded bg-gunmetal">L2</button>
    <button onclick={l3} class="h-36 w-80 rounded bg-gunmetal">L3</button>
    <button onclick={l4} class="h-36 w-80 rounded bg-gunmetal">L3</button>

    <button
        class="grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
