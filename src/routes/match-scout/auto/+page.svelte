<script lang="ts">
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import RemoveAlgae from "../RemoveAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import Intake from "../Intake.svelte"
    import SucceedFail from "../SucceedFail.svelte"

    import type {
        AutoPageState,
        AutoActionState,
        AutoActionData,
    } from "$lib/types"
    import Timeline from "../Timeline.svelte"

    let displaying_timeline = $state(false)
    let furthest_auto_index = $state(0)

    let page_state: AutoPageState = $state("None")
    let action_state: AutoActionState = $state("None")

    let actions: AutoActionData[] = $state([])

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

    <button
        class="font-heading w-full border-t-2 border-white/10 pt-2 text-center font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline
        bind:actions
        bind:displaying={displaying_timeline}
        bind:furthest_auto_index
    />
</div>
