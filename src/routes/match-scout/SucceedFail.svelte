<script lang="ts">
    import type { AutoPageState, FrontendAutoActionData } from "$lib/types"
    import type { AutoAction } from "@prisma/client"

    let {
        page_state = $bindable(),
        actions = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        actions: FrontendAutoActionData[]
        action_state: AutoAction | null
    } = $props()

    const succeed = () => {
        const action = {
            action: action_state!,
            success: true,
        }
        actions.push(action)
        action_state = null
        page_state = "None"
    }
    const fail = () => {
        const action = {
            action: action_state!,
            success: false,
        }
        actions.push(action)
        action_state = null
        page_state = "None"
    }
    const cancel = () => {
        action_state = null
        page_state = "None"
    }
</script>

<div class="grid h-full flex-grow grid-cols-2 grid-rows-5 gap-2">
    <button onclick={succeed} class="row-span-4 rounded bg-jungle_green"
        >Succeed</button
    >
    <button onclick={fail} class="row-span-4 rounded bg-imperial_red"
        >Fail</button
    >

    <button class="col-span-2 rounded bg-gunmetal" onclick={cancel}
        >Cancel</button
    >
</div>
