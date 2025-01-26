<script lang="ts">
    import type { AutoAction, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
    }: {
        page_state: AutoPageState
        action_state: AutoAction
    } = $props()

    const coral_station = () => {
        action_state = "IntakeCoralStation"
        page_state = "Verify"
    }
    const coral_preplaced = () => {
        action_state = "IntakeCoralPreplaced"
        page_state = "Verify"
    }
    const algae_preplaced = () => {
        action_state = "IntakeAlgaePreplaced"
        page_state = "Verify"
    }
    const algae_reef = () => {
        action_state = "IntakeAlgaeReef"
        page_state = "Verify"
    }
    const cancel = () => {
        action_state = "None"
        page_state = "None"
    }
</script>

<div class="grid flex-grow grid-cols-2 grid-rows-2 gap-2">
    <button onclick={coral_station} class="rounded bg-gunmetal"
        >Coral Station</button
    >
    <button onclick={coral_preplaced} class="rounded bg-gunmetal"
        >Coral Preplaced</button
    >
    <button onclick={algae_preplaced} class="rounded bg-gunmetal"
        >Algae Preplaced</button
    >
    <button onclick={algae_reef} class="rounded bg-gunmetal">Algae Reef</button>
</div>

<button class="rounded bg-gunmetal py-4" onclick={cancel}>Cancel</button>
