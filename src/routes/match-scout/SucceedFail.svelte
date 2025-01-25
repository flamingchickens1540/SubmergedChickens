<script lang="ts">
    let {
        page_state = $bindable(),
        action_state,
    }: {
        page_state:
            | "ScoreAlgae"
            | "RemoveAlgae"
            | "ScoreCoral"
            | "Intake"
            | "Verify"
            | "None"
        action_state:
            | "ScoreAlgae"
            | "RemoveAlgae"
            | "ScoreCoral"
            | "Intake"
            | "None"
    } = $props()

    const succeed = () => {
        page_state = "None"
    }
    const fail = () => {
        page_state = "None"
    }
    const cancel = () => (page_state = "None")
</script>

<div class="m-2 grid grid-cols-2 grid-rows-12 place-items-center gap-2">
    <button onclick={succeed} class="h-36 w-80 rounded bg-gunmetal"
        >Succeed</button
    >
    <button onclick={fail} class="h-36 w-80 rounded bg-gunmetal">Fail</button>

    <button
        class="col-span-2 grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
