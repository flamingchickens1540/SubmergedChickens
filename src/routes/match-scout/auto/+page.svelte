<script lang="ts">
    import { goto } from "$app/navigation"

    import Header from "../Header.svelte"
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import CleanAlgae from "../CleanAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import Intake from "../Intake.svelte"
    import SucceedFail from "../SucceedFail.svelte"

    import type {
        AutoPageState,
        AutoAction,
        AutoActionData,
        TeleActionData,
        UncountedTeamMatch,
    } from "$lib/types"
    import Timeline from "../Timeline.svelte"

    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import { localStore } from "@/localStore.svelte"

    let team_color = $state(localStore<"blue" | "red" | "">("team_color", ""))

    // NOTE The passed object will only be set if there's nothing there
    // Meaning this object should never actually get set
    let matchData = $state(
        localStore<UncountedTeamMatch>("matchData", {
            event_key: "",
            match_key: "",
            team_key: 0,
            auto_start_location: "Far",
            auto_leave_start: false,
            timeline: {
                auto: [] as AutoActionData[],
                tele: [] as TeleActionData[],
            },
            endgame: "None",
            skill: 3,
            notes: "",
            incap_time: [],
            scout_id: "",
            tagNames: [],
        })
    )

    const swipeHandler = (event: SwipeCustomEvent) => {
        switch (event.detail.direction) {
            case "right":
                goto(
                    `/match-scout/prematch?match=${matchData.value.match_key}&team=${matchData.value.team_key}&color=${team_color.value}`
                )
                break
            case "left":
                goto("/match-scout/tele")
                break
        }
    }

    let page_state: AutoPageState = $state("None")
    let action_state: AutoAction = $state("None")

    const clean_algae = () => (page_state = "CleanAlgae")
    const score_algae = () => (page_state = "ScoreAlgae")
    const score_coral = () => (page_state = "ScoreCoral")
    const intake = () => (page_state = "Intake")

    const bg_color = "bg-steel_blue"

    const prev_page = $derived(
        page_state == "None"
            ? () => {
                  console.log(matchData.value.team_key)
                  goto(
                      `/match-scout/prematch?team=${matchData.value.team_key}&match=${matchData.value.match_key}&color=${team_color.value}`
                  )
              }
            : undefined
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
        team_key={matchData.value.team_key}
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
                class="grid flex-grow grid-cols-2 gap-2"
            >
                <button class="rounded {bg_color}" onclick={score_algae}
                    >Score Algae</button
                >
                <button class="rounded {bg_color}" onclick={clean_algae}
                    >Clean Algae</button
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
        {:else if page_state == "CleanAlgae"}
            <CleanAlgae bind:page_state bind:action_state {bg_color} />
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

    <!-- <button -->
    <!--     class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold" -->
    <!--     onclick={(e: Event) => { -->
    <!--         e.stopPropagation() -->
    <!--         displaying_timeline = true -->
    <!--     }}>Show Timeline</button -->
    <!-- > -->
    <!-- <Timeline -->
    <!--     bg={"bg-eerie_black bg-mix-steel_blue bg-mix-amount-10"} -->
    <!--     bind:displaying={displaying_timeline} -->
    <!-- /> -->
</div>
