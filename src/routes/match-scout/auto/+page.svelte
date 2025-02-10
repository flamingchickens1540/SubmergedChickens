<script lang="ts">
    import { goto } from "$app/navigation"

    import Header from "../Header.svelte"
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import RemoveAlgae from "../RemoveAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import Intake from "../Intake.svelte"
    import SucceedFail from "../SucceedFail.svelte"

    import type {
        AutoPageState,
        AutoAction,
        AutoActionData,
        TeamMatchData,
    } from "$lib/types"
    import Timeline from "../Timeline.svelte"

    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import { localStore } from "@/localStore.svelte"

    let matchData = $state(
        localStore<TeamMatchData>("matchData", {
            scout_id: "",
            team_key: "",
            match_key: "",
            timeline: {
                auto: [],
                tele: [],
            },
            end: "None",
            driver_skill: 3,
            notes: "",
            tags: [],
        })
    )

    const swipeHandler = (event: SwipeCustomEvent) => {
        switch (event.detail.direction) {
            case "right":
                goto("/match-scout/prematch")
                break
            case "left":
                goto("/match-scout/tele")
                break
        }
    }

    let displaying_timeline = $state(false)
    let furthest_auto_index = $state(0)

    let page_state: AutoPageState = $state("None")
    let action_state: AutoAction = $state("None")

    const score_algae = () => (page_state = "ScoreAlgae")
    const remove_algae = () => (page_state = "RemoveAlgae")
    const score_coral = () => (page_state = "ScoreCoral")
    const intake = () => (page_state = "Intake")

    const bg_color = "bg-steel_blue"

    const prev_page = $derived(
        page_state == "None" ? () => goto("/match-scout/prematch") : undefined
    )
    const next_page = $derived(
        page_state == "None" ? () => goto("/match-scout/tele") : undefined
    )
</script>

<svelte:head>
    <!-- eerie black + 10% steel blue -->
    <meta name="theme-color" content="#1f262b" />
</svelte:head>

<div
    class="flex min-h-dvh flex-col bg-eerie_black accent-steel_blue bg-mix-steel_blue bg-mix-amount-10"
>
    <Header
        game_stage={"Auto"}
        team_name={matchData.value.team_key}
        {page_state}
        {prev_page}
        {next_page}
        bind:timeline={matchData.value.timeline.auto}
    />
    <div class="m-2 flex flex-grow flex-col gap-2 text-xl font-semibold">
        {#if page_state == "None"}
            <div
                use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
                onswipe={swipeHandler}
                class="grid flex-grow gap-2"
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
                <button class="rounded {bg_color}" onclick={intake}
                    >Intake</button
                >
            </div>
        {:else if page_state == "ScoreAlgae"}
            <ScoreAlgae bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "RemoveAlgae"}
            <RemoveAlgae bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "ScoreCoral"}
            <ScoreCoral bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "Intake"}
            <Intake bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "Verify"}
            <SucceedFail
                bind:page_state
                bind:action_state
                bind:actions={matchData.value.timeline.auto}
            />
        {/if}
    </div>

    <button
        class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline
        bg={"bg-eerie_black bg-mix-steel_blue bg-mix-amount-10"}
        bind:actions={matchData.value.timeline.auto}
        bind:displaying={displaying_timeline}
        bind:furthest_auto_index
    />
</div>
