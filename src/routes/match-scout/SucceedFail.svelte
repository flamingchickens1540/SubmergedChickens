<script lang="ts">
    let {
        page_state = $bindable(),
        actions = $bindable(),
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
        actions: string[] // Action[]
    } = $props()

    const succeed = () => {
        const action = action_state + "Success"
        console.log(action)
        actions.push(action)
        page_state = "None"
    }
    const fail = () => {
        const action = action_state + "Failure"
        console.log(action)
        actions.push(action)
        page_state = "None"
    }
    const cancel = () => (page_state = "None")
</script>

<div class="m-2 grid grid-cols-2 grid-rows-12 place-items-center gap-2">
    <button onclick={succeed} class="h-80 w-36 rounded bg-gunmetal"
        >Succeed</button
    >
    <button onclick={fail} class="h-80 w-36 rounded bg-gunmetal">Fail</button>

    <button
        class="col-span-2 grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
