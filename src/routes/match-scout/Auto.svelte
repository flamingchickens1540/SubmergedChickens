<script lang="ts">
    import { goto } from "$app/navigation"
    import ScoreAlgae from "./ScoreAlgae.svelte"
    import CleanAlgae from "./CleanAlgae.svelte"
    import ScoreCoral from "./ScoreCoral.svelte"
    import Intake from "./Intake.svelte"
    import SucceedFail from "./SucceedFail.svelte"
    import type { AutoPageState, UncountedTeamMatch } from "$lib/types"
    import type { SwipeCustomEvent } from "svelte-gestures"
    import { AutoAction } from "@prisma/client"
    import Timeline from "./Timeline.svelte"

    const {
        color,
        match_data = $bindable(),
    }: { color: "red" | "blue"; match_data: UncountedTeamMatch } = $props()

    let page_state: AutoPageState = $state("None")
    let action_state: AutoAction | null = $state(null)

    let displaying_timeline = $state(false)

    const clean_algae = () => (page_state = "CleanAlgae")
    const score_algae = () => (page_state = "ScoreAlgae")
    const score_coral = () => (page_state = "ScoreCoral")
    const intake = () => (page_state = "Intake")

    const bg_color = "bg-steel_blue"
</script>

<div
    class="m-2 flex flex-1 flex-grow flex-col gap-2 bg-eerie_black text-xl font-semibold"
>
    {#if page_state == "None"}
        <div class="grid flex-grow grid-cols-2 gap-2">
            <button class="rounded {bg_color}" onclick={score_algae}
                >Score Algae</button
            >
            <button class="rounded {bg_color}" onclick={clean_algae}
                >Clean Algae</button
            >
            <button class="rounded {bg_color}" onclick={score_coral}
                >Score Coral</button
            >
            <button class="rounded {bg_color}" onclick={intake}>Intake</button>
        </div>
        <button
            class="font-heading w-full border-t-2 border-white/10 p-2 pb-1 text-center text-lg font-semibold"
            onclick={(e: Event) => {
                e.stopPropagation()
                displaying_timeline = true
            }}>Show Timeline</button
        >
        <Timeline
            bind:displaying={displaying_timeline}
            bind:timeline={match_data.timeline}
        />
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
            bind:actions={match_data.timeline.auto}
        />
    {/if}
</div>
