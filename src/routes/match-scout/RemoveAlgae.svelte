<script lang="ts">
    let {
        state = $bindable(),
    }: {
        state:
            | "ScoreAlgae"
            | "RemoveAlgae"
            | "ScoreCoral"
            | "Intake"
            | "Verify"
            | "None"
    } = $props()

    const l2 = () => (state = "Verify")
    const l3 = () => (state = "Verify")
    const cancel = () => (state = "None")
</script>

<div class="m-2 grid grid-cols-1 grid-rows-3 place-items-center gap-2">
    <button onclick={l2} class="h-44 w-80 rounded bg-gunmetal">L2</button>
    <button onclick={l3} class="h-44 w-80 rounded bg-gunmetal">L3</button>

    <button
        class="grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
