<script lang="ts">
    import type { ActionState, PageState } from "$lib/types"

    let {
        page_state = $bindable(),
        actions = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: PageState
        action_state: ActionState
        actions: string[] // TODO Change to Action[]
    } = $props()

    const succeed = () => {
        const action = action_state + "Success"
        actions.push(action)
        action_state = "None"
        page_state = "None"
    }
    const fail = () => {
        const action = action_state + "Failure"
        actions.push(action)
        action_state = "None"
        page_state = "None"
    }
    const cancel = () => {
        action_state = "None"
        page_state = "None"
    }
</script>

<div class="m-2 grid grid-cols-2 grid-rows-12 place-items-center gap-2">
    <button onclick={succeed} class="h-80 w-40 rounded bg-gunmetal"
        >Succeed</button
    >
    <button onclick={fail} class="h-80 w-40 rounded bg-gunmetal">Fail</button>

    <button
        class="col-span-2 grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
