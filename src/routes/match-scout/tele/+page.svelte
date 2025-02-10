<script lang="ts">
    import { goto } from "$app/navigation"

    import Header from "../Header.svelte"
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import CleanAlgae from "../CleanAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import SucceedFail from "../SucceedFail.svelte"

    import type {
        TelePageState,
        TeleActionState,
        TeleActionData,
        TeamMatchData,
    } from "$lib/types"
    import Incap from "../Incap.svelte"

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
                goto("/match-scout/auto")
                break
            case "left":
                goto("/match-scout/postmatch")
                break
        }
    }

    let page_state: TelePageState = $state("None")
    let action_state: TeleActionState = $state("None")

    const incap = () => {
        matchData.value.timeline.tele.push({ action: "Incap", success: true })
        page_state = "Incap"
    }
    const score_algae = () => (page_state = "ScoreAlgae")
    const remove_algae = () => (page_state = "CleanAlgae")
    const score_coral = () => (page_state = "ScoreCoral")

    const bg_color = "bg-eminence"

    const prev_page = $derived(
        page_state == "None" ? () => goto("/match-scout/auto") : undefined
    )
    const next_page = $derived(
        page_state == "None" ? () => goto("/match-scout/postmatch") : undefined
    )
</script>

<svelte:head>
    <!-- eerie black + 10% eminence -->
    <meta name="theme-color" content="#241e26" />
</svelte:head>

<div
    class="flex min-h-dvh flex-col bg-eerie_black accent-eminence bg-mix-eminence bg-mix-amount-10"
>
    <Header
        game_stage={"Tele"}
        team_name={matchData.value.team_key}
        {page_state}
        {prev_page}
        {next_page}
        bind:timeline={matchData.value.timeline.tele}
    />

    <div class="m-2 flex flex-grow flex-col gap-2 text-xl font-semibold">
        {#if page_state == "None"}
            <div
                use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
                onswipe={swipeHandler}
                class="grid flex-grow grid-cols-2 gap-2"
            >
                <button class="rounded {bg_color}" onclick={incap}>Incap</button
                >
                <button class="rounded {bg_color}" onclick={score_algae}
                    >Score Algae</button
                >
                <button class="rounded {bg_color}" onclick={remove_algae}
                    >Clean Algae</button
                >
                <button class="rounded {bg_color}" onclick={score_coral}
                    >Score Coral</button
                >
            </div>
        {:else if page_state == "ScoreAlgae"}
            <ScoreAlgae bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "CleanAlgae"}
            <CleanAlgae bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "ScoreCoral"}
            <ScoreCoral bind:page_state bind:action_state {bg_color} />
        {:else if page_state == "Verify"}
            <SucceedFail
                bind:page_state
                bind:action_state
                bind:actions={matchData.value.timeline.tele}
            />
        {:else if page_state == "Incap"}
            <Incap bind:page_state bind:action_state {bg_color} />
        {/if}
    </div>

    <!-- <button -->
    <!--     class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold" -->
    <!--     onclick={(e: Event) => { -->
    <!--         e.stopPropagation() -->
    <!--         displaying_timeline = true -->
    <!--     }}>Show Timeline</button -->
    <!-- > -->
    <!-- <Timeline -->
    <!--     bg={"bg-eerie_black bg-mix-eminence bg-mix-amount-10"} -->
    <!--     bind:displaying={displaying_timeline} -->
    <!-- /> -->
</div>
