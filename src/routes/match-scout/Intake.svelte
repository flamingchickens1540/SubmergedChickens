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

<div class="m-2 grid grid-cols-2 grid-rows-3 place-items-center gap-2">
    <button onclick={coral_station} class="h-36 w-44 rounded bg-gunmetal"
        >Coral Station</button
    >
    <button onclick={coral_preplaced} class="h-36 w-44 rounded bg-gunmetal"
        >Coral Preplaced</button
    >
    <button onclick={algae_preplaced} class="h-36 w-44 rounded bg-gunmetal"
        >Algae Preplaced</button
    >
    <button onclick={algae_reef} class="h-36 w-44 rounded bg-gunmetal"
        >Algae Reef</button
    >

    <button
        class="col-span-2 grid h-16 w-9/12 place-content-center rounded bg-gunmetal"
        onclick={cancel}>Cancel</button
    >
</div>
