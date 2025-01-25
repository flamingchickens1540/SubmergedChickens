<script lang="ts">
    import ScoreAlgae from "../ScoreAlgae.svelte"
    import RemoveAlgae from "../RemoveAlgae.svelte"
    import ScoreCoral from "../ScoreCoral.svelte"
    import SucceedFail from "../SucceedFail.svelte"

    import type { TelePageState, TeleActionState } from "$lib/types"
    import Incap from "../Incap.svelte"

    let page_state: TelePageState = $state("None")
    let action_state: TeleActionState = $state("None")

    let actions: string[] = $state([])

    const incap = () => {
        actions.push("IncapStart")
        page_state = "Incap"
    }
    const score_algae = () => (page_state = "ScoreAlgae")
    const remove_algae = () => (page_state = "RemoveAlgae")
    const score_coral = () => (page_state = "ScoreCoral")
</script>

<div>
    {#if page_state == "None"}
        <div class="m-2 grid grid-cols-1 grid-rows-2 place-items-center gap-2">
            <button class="h-44 w-72 rounded bg-gunmetal" onclick={incap}
                >Incap</button
            >
            <button class="h-44 w-72 rounded bg-gunmetal" onclick={score_algae}
                >Score Algae</button
            >
            <button class="h-44 w-72 rounded bg-gunmetal" onclick={remove_algae}
                >Remove Algae</button
            >
            <button class="h-44 w-72 rounded bg-gunmetal" onclick={score_coral}
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
        <Incap bind:page_state bind:action_state bind:actions />
    {/if}
</div>
