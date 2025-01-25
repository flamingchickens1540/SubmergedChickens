<script lang="ts">
    let {
        page_state = $bindable(),
    }: {
        page_state:
            | "ScoreAlgae"
            | "RemoveAlgae"
            | "ScoreCoral"
            | "Intake"
            | "Verify"
            | "None"
    } = $props()

    const coral_station = () => (page_state = "Verify")
    const coral_preplaced = () => (page_state = "Verify")
    const algae_preplaced = () => (page_state = "Verify")
    const algae_reef = () => (page_state = "Verify")
    const cancel = () => (page_state = "None")
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
