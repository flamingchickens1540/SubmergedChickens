<script lang="ts">
    import type { AutoActionState, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        actions = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoActionState
        actions: string[] // TODO Change to Action[]
    } = $props()

    const recap = () => {
        actions.push("IncapEnd")
        action_state = "None"
        page_state = "None"
    }
</script>

<div class="m-2 grid grid-cols-2 grid-rows-12 place-items-center gap-2">
    <button
        class="col-span-2 grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={recap}>Re-Capacitate</button
    >
</div>
