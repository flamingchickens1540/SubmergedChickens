<script lang="ts">
    import { browser } from "$app/environment"
    import type { PageData } from "./$types"

    const data: PageData = $props()

    let one_is_better = $state(false)

    const submit = async (category: string) => {
        const event_key = (browser && localStorage.getItem("event_key")) || ""
        // TODO Type after `Brandon/backend` gets merged
        const comp = {
            team_A_team_num: data.one,
            team_A_match_key: data.one_match,
            team_B_team_num: data.two,
            team_B_match_key: data.two_match,
            // TODO Figure out how to want to manage diff
            diff: 1,
            category,
            event_key,
        }

        await fetch("/api/submitPairwise", {
            method: "POST",
            body: JSON.stringify(comp),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
</script>

{#each data.categories as category}
    <div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
        <div class="col-span-2">
            Please select the robot better at {category}
        </div>
        <button
            class="{one_is_better
                ? 'bg-green-500'
                : 'bg-gunmetal'} h-96 rounded"
            onclick={() => (one_is_better = true)}>{data.one}</button
        >
        <button
            class="{one_is_better ? 'bg-gunmetal' : 'bg-green-500'} rounded"
            onclick={() => (one_is_better = false)}>{data.two}</button
        >
        <button
            class="col-span-2 h-24 rounded bg-gunmetal"
            onclick={() => submit(category)}>Submit Comparison</button
        >
    </div>
{/each}
