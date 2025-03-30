<script lang="ts">
    import ScoreAlgae from "./ScoreAlgae.svelte"
    import CleanAlgae from "./CleanAlgae.svelte"
    import ScoreCoral from "./ScoreCoral.svelte"
    import SucceedFail from "./SucceedFail.svelte"
    import type { AutoPageState, UncountedTeamMatch } from "$lib/types"
    import { AutoAction } from "@prisma/client"
    import Timeline from "./Timeline.svelte"

    const { match_data = $bindable() }: { match_data: UncountedTeamMatch } =
        $props()

    let page_state: AutoPageState = $state("None")
    let action_state: AutoAction | null = $state(null)

    let displaying_timeline = $state(false)

    const clean_algae = () => (page_state = "CleanAlgae")
    const score_algae = () => (page_state = "ScoreAlgae")
    const score_coral = () => (page_state = "ScoreCoral")

    const bg_color = "bg-steel_blue"
</script>

<div class="m-2 flex flex-1 flex-grow flex-col gap-2 bg-eerie_black">
    {#if page_state == "None"}
        <div class="grid flex-grow grid-cols-2 gap-2 text-xl font-semibold">
            <button class="rounded {bg_color}" onclick={score_algae}
                >Score Algae</button
            >
            <button class="rounded {bg_color}" onclick={clean_algae}
                >Clean Algae</button
            >
            <button class="rounded {bg_color} col-span-2" onclick={score_coral}
                >Score Coral</button
            >
        </div>
        <button
            class="w-full rounded bg-gunmetal p-2 text-center text-xl font-semibold"
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
    {:else if page_state == "Verify"}
        <SucceedFail
            bind:page_state
            bind:action_state
            bind:actions={match_data.timeline.auto}
        />
    {/if}
</div>
