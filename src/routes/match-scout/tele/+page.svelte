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

    const bg_color = "bg-eminence"
</script>

<div class="flex min-h-dvh flex-col bg-eminence/10">
    <Header game_stage={"Tele"} team_name={1540} bind:page_state />

    <div class="m-2 flex flex-grow flex-col gap-2 text-lg font-semibold">
        {#if page_state == "None"}
            <div class="grid flex-grow gap-2">
                <button class="rounded {bg_color}" onclick={incap}>Incap</button
                >
                <button class="rounded {bg_color}" onclick={score_algae}
                    >Score Algae</button
                >
                <button class="rounded {bg_color}" onclick={remove_algae}
                    >Remove Algae</button
                >
                <button class="rounded {bg_color}" onclick={score_coral}
                    >Score Coral</button
                >
            </div>
        {:else if page_state == "ScoreAlgae"}
            <ScoreAlgae bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "RemoveAlgae"}
            <RemoveAlgae bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "ScoreCoral"}
            <ScoreCoral bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "Verify"}
            <SucceedFail
                bind:page_state
                bind:action_state
                bind:actions
                {bg_color}
            />
        {:else if page_state == "Incap"}
            <Incap bind:page_state bind:action_state {bg_color} />
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
