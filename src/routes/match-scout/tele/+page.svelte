<script lang="ts">
    import Header from "../Header.svelte"
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import RemoveAlgae from "../RemoveAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import SucceedFail from "../SucceedFail.svelte"

    import type {
        TelePageState,
        TeleActionState,
        TeleActionData,
    } from "$lib/types"
    import Incap from "../Incap.svelte"
    import Timeline from "../Timeline.svelte"

    let displaying_timeline = $state(false)
    let furthest_auto_index = $state(0)

    let page_state: TelePageState = $state("None")
    let action_state: TeleActionState = $state("None")

    let actions: TeleActionData[] = $state([])

    const incap = () => {
        actions.push({ action: "Incap", success: true })
        page_state = "Incap"
    }
    const score_algae = () => (page_state = "ScoreAlgae")
    const remove_algae = () => (page_state = "RemoveAlgae")
    const score_coral = () => (page_state = "ScoreCoral")
</script>

<div class="flex flex-col min-h-dvh">
    <Header game_stage={"Tele"} team_name={1540} bind:page_state />

    <div class="m-2 flex flex-col flex-grow gap-2 font-semibold text-lg">
        {#if page_state == "None"}
            <div class="grid flex-grow gap-2">
                <button class="rounded bg-gunmetal" onclick={incap}
                    >Incap</button
                >
                <button class="rounded bg-gunmetal" onclick={score_algae}
                    >Score Algae</button
                >
                <button class="rounded bg-gunmetal" onclick={remove_algae}
                    >Remove Algae</button
                >
                <button class="rounded bg-gunmetal" onclick={score_coral}
                    >Score Coral</button
                >
            </div>
        {:else if page_state == "ScoreAlgae"}
            <ScoreAlgae bind:page_state bind:action_state />
        {:else if page_state == "RemoveAlgae"}
            <RemoveAlgae bind:page_state bind:action_state />
        {:else if page_state == "ScoreCoral"}
            <ScoreCoral bind:page_state bind:action_state />
        {:else if page_state == "Verify"}
            <SucceedFail bind:page_state bind:action_state bind:actions />
        {:else if page_state == "Incap"}
            <Incap bind:page_state bind:action_state />
        {/if}
    </div>

    <button
        class="font-heading w-full border-t-2 border-white/10 py-2 text-center font-semibold"
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
