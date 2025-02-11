<script lang="ts">
    import type { AutoAction, AutoPageState } from "$lib/types"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
        bg_color,
    }: {
        page_state: AutoPageState
        action_state: AutoAction
        bg_color: String
    } = $props()
    const algae_preplaced = () => {
        action_state = "IntakeAlgaePreplaced"
        page_state = "Verify"
    }
    const algae_floor = () => {
        action_state = "IntakeAlgaeFloor"
        page_state = "Verify"
    }
    const coral_station = () => {
        action_state = "IntakeCoralStation"
        page_state = "Verify"
    }
    const coral_preplaced = () => {
        action_state = "IntakeCoralPreplaced"
        page_state = "Verify"
    }
    const coral_floor = () => {
        action_state = "IntakeCoralFloor"
        page_state = "Verify"
    }

    const cancel = () => {
        action_state = "None"
        page_state = "None"
    }
</script>

<div class="grid flex-grow grid-cols-2 grid-rows-4 gap-2">
    <button onclick={algae_preplaced} class="rounded {bg_color}"
        >Algae Preplaced</button
    >
    <button onclick={algae_floor} class="rounded {bg_color}">Algae Floor</button
    >
    <button onclick={coral_station} class="row-span-2 rounded {bg_color}"
        >Coral Station</button
    >
    <button onclick={coral_preplaced} class="row-span-2 rounded {bg_color}"
        >Coral Preplaced</button
    >
    <button
        onclick={coral_floor}
        class="col-span-2 row-span-2 rounded {bg_color}">Coral Floor</button
    >
</div>

<button class="rounded bg-gunmetal py-4" onclick={cancel}>Cancel</button>
