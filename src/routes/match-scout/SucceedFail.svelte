<script lang="ts">
    import type { AutoActionData, AutoAction, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        actions = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoAction
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

<div class="grid h-full flex-grow grid-cols-2 grid-rows-5 gap-2">
    <button onclick={succeed} class="row-span-4 rounded bg-jungle_green"
        >Succeed</button
    >
    <button onclick={fail} class="row-span-4 rounded bg-flaming_red"
        >Fail</button
    >

    <button class="col-span-2 rounded bg-gunmetal" onclick={cancel}
        >Cancel</button
    >
</div>
