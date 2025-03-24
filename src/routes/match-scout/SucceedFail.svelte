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

<div class="grid flex-grow grid-cols-2 gap-2">
    <button onclick={succeed} class="rounded bg-jungle_green">Succeed</button>
    <button onclick={fail} class="rounded bg-imperial_red">Fail</button>
</div>
<button class="rounded bg-gunmetal py-2" onclick={cancel}>Cancel</button>
