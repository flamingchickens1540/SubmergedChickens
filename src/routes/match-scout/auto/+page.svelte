<script lang="ts">
    let state:
        | "ScoreAlgae"
        | "RemoveAlgae"
        | "ScoreCoral"
        | "Intake"
        | "Verify"
        | "None" = $state("None")

    const score_algae = () => (state = "ScoreAlgae")
    const remove_algae = () => (state = "RemoveAlgae")
    const score_coral = () => (state = "ScoreCoral")
    const intake = () => (state = "Intake")

    const processor = () => {}
    const net = () => {}
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
        <div class="m-2 grid grid-cols-1 grid-rows-2 place-items-center gap-2">
            <button class="h-44 w-80 rounded bg-gunmetal" onclick={processor}>
                Processor
            </button>
            <button class="h-44 w-80 rounded bg-gunmetal" onclick={net}>
                Net
            </button>
        </div>
        <button class="grid w-9/12 rounded bg-gunmetal">Cancel</button>
    {/if}
</div>
