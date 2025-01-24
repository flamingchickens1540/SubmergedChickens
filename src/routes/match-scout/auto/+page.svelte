<script lang="ts">
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import RemoveAlgae from "../RemoveAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import Intake from "../Intake.svelte"

    let state:
        | "ScoreAlgae"
        | "RemoveAlgae"
        | "ScoreCoral"
        | "Intake"
        | "Verify"
        | "None" = $state("None")

    const cancel = () => (state = "None")

    const score_algae = () => (state = "ScoreAlgae")
    const remove_algae = () => (state = "RemoveAlgae")
    const score_coral = () => (state = "ScoreCoral")
    const intake = () => (state = "Intake")
</script>

<div>
    {#if state == "None"}
        <div class="m-2 grid grid-cols-2 grid-rows-2 place-items-center gap-2">
            <button class="h-44 w-44 rounded bg-gunmetal" onclick={score_algae}
                >Score Algae</button
            >
            <button class="h-44 w-44 rounded bg-gunmetal" onclick={remove_algae}
                >Remove Algae</button
            >
            <button class="h-44 w-44 rounded bg-gunmetal" onclick={score_coral}
                >Score Coral</button
            >
            <button class="h-44 w-44 rounded bg-gunmetal" onclick={intake}
                >Intake</button
            >
        </div>
    {:else if state == "ScoreAlgae"}
        <ScoreAlgae bind:state />
    {:else if state == "RemoveAlgae"}
        <RemoveAlgae bind:state />
    {:else if state == "ScoreCoral"}
        <ScoreCoral bind:state />
    {:else if state == "Intake"}
        <Intake bind:state />
    {/if}
</div>
