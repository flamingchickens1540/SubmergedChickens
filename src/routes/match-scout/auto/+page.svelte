<script lang="ts">
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import RemoveAlgae from "../RemoveAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import Intake from "../Intake.svelte"
    import SucceedFail from "../SucceedFail.svelte"

    import type { PageState, ActionState } from "$lib/types"

    let page_state: PageState = $state("None")
    let action_state: ActionState = $state("None")

    let actions: string[] = $state([])

    const score_algae = () => (page_state = "ScoreAlgae")
    const remove_algae = () => (page_state = "RemoveAlgae")
    const score_coral = () => (page_state = "ScoreCoral")
    const intake = () => (page_state = "Intake")
</script>

<div>
    {#if page_state == "None"}
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
    {:else if page_state == "ScoreAlgae"}
        <ScoreAlgae bind:page_state bind:action_state />
    {:else if page_state == "RemoveAlgae"}
        <RemoveAlgae bind:page_state bind:action_state />
    {:else if page_state == "ScoreCoral"}
        <ScoreCoral bind:page_state bind:action_state />
    {:else if page_state == "Intake"}
        <Intake bind:page_state bind:action_state />
    {:else if page_state == "Verify"}
        <SucceedFail bind:page_state bind:action_state bind:actions />
    {/if}
</div>
