<script lang="ts">
    import ScoreAlgae from "./ScoreAlgae.svelte"
    import CleanAlgae from "./CleanAlgae.svelte"
    import ScoreCoral from "./ScoreCoral.svelte"
    import SucceedFail from "./SucceedFail.svelte"
    import type { TelePageState, UncountedTeamMatch } from "@/types"
    import Incap from "./Incap.svelte"
    import { TeleAction } from "@prisma/client"
    import Timeline from "./Timeline.svelte"

    const { match_data = $bindable() }: { match_data: UncountedTeamMatch } =
        $props()

    let page_state: TelePageState = $state("None")
    let action_state: TeleAction | null = $state(null)

    let displaying_timeline = $state(false)

    const incap = () => {
        match_data.timeline.tele.push({ action: "Incap", success: true })
        page_state = "Incap"
    }
    const score_algae = () => (page_state = "ScoreAlgae")
    const remove_algae = () => (page_state = "CleanAlgae")
    const score_coral = () => (page_state = "ScoreCoral")

    const bg_color = "bg-eminence"
</script>

<div
    class="m-2 flex flex-1 flex-grow flex-col gap-2 overflow-y-hidden bg-eerie_black"
>
    {#if page_state == "None"}
        <div class="grid flex-grow grid-cols-2 gap-2 text-xl font-semibold">
            <button class="rounded {bg_color}" onclick={score_algae}
                >Score Algae</button
            >
            <button class="rounded {bg_color}" onclick={remove_algae}
                >Clean Algae</button
            >
            <button class="rounded {bg_color}" onclick={score_coral}
                >Score Coral</button
            >
            <button class="rounded {bg_color}" onclick={incap}>Incap</button>
        </div>
        <button
            class="col-span-2 w-full rounded bg-gunmetal p-2 text-center text-xl font-semibold"
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
            bind:actions={match_data.timeline.tele}
        />
    {:else if page_state == "Incap"}
        <Incap
            bind:page_state
            bind:action_state
            bind:incap_times={match_data.incap_time}
            {bg_color}
        />
    {/if}
</div>
