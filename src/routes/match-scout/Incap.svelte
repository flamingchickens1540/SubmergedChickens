<script lang="ts">
    import type { AutoAction, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoAction
    } = $props()

    const recap = () => {
        action_state = "None"
        page_state = "None"
    }
</script>

<button
    class="rounded bg-gunmetal flex-grow"
    onclick={recap}>Re-Capacitate</button
>
