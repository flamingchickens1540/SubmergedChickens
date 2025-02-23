<script lang="ts">
    import type { AutoAction, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
        bg_color,
    }: {
        page_state: AutoPageState
        action_state: AutoAction
        bg_color: string
    } = $props()

    const recap = () => {
        action_state = "None"
        page_state = "None"
    }
</script>

<button class="flex-grow rounded {bg_color}" onclick={recap}
    >Re-Capacitate</button
>
