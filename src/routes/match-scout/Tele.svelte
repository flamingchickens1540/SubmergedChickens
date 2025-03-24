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

<svelte:head>
    <!-- eerie black + 10% eminence -->
    <!-- TODO: Maybe remove -->
    <meta name="theme-color" content="#241e26" />
</svelte:head>
<!-- min-h-dvh -->
<div
    class="flex min-h-dvh flex-col bg-eerie_black accent-eminence bg-mix-eminence bg-mix-amount-10"
>
    <div class="m-2 flex flex-grow flex-col gap-2 text-xl font-semibold">
        {#if page_state == "None"}
            <div class="grid flex-grow grid-cols-2 gap-2">
                <button class="rounded {bg_color}" onclick={score_algae}
                    >Score Algae</button
                >
                <button class="rounded {bg_color}" onclick={remove_algae}
                    >Clean Algae</button
                >
                <button class="rounded {bg_color}" onclick={score_coral}
                    >Score Coral</button
                >
                <button class="rounded {bg_color}" onclick={incap}>Incap</button
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

    <button
        class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline
        bg={"bg-eerie_black bg-mix-eminence bg-mix-amount-10"}
        bind:displaying={displaying_timeline}
        bind:timeline={match_data.timeline}
    />
</div>
