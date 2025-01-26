<script lang="ts">
    import type {
        AutoActionData,
        AutoActionState,
        AutoPageState,
    } from "$lib/types"

    let {
        page_state = $bindable(),
        actions = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoActionState
        actions: AutoActionData[] // TODO Change to Action[]
    } = $props()

    const succeed = () => {
        const action = {
            action: action_state,
            success: true,
        }
        actions.push(action)
        action_state = "None"
        page_state = "None"
    }
    const fail = () => {
        const action = {
            action: action_state,
            success: false,
        }
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
