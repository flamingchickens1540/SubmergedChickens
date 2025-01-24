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

    const processor = () => (state = "Verify")
    const net = () => (state = "Verify")
    const cancel = () => (state = "None")
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
