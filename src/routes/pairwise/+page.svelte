<script lang="ts">
    import { browser } from "$app/environment"
    import type { PageData } from "./$types"

    const data: PageData = $props()

    let one_is_better = $state(false)

    const submit = async () => {
        const category = data.categories.shift()
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

{#if data.categories.length < 1}
    <span>TODO: redirect or something</span>
{:else}
    <div class="flex h-dvh flex-col gap-2 p-2 text-center">
        <span class="col-span-2 text-lg">
            Please select the robot better at <b class="font-bold"
                >{data.categories[0]}</b
            >
        </span>
        <div
            class="grid h-dvh grid-cols-2 grid-rows-5 gap-2 text-xl font-semibold"
        >
            <button
                class="{one_is_better
                    ? 'bg-green-500'
                    : 'bg-gunmetal'} row-span-4 rounded-lg"
                onclick={() => (one_is_better = true)}>{data.one}</button
            >
            <button
                class="{one_is_better
                    ? 'bg-gunmetal'
                    : 'bg-green-500'} row-span-4 rounded-lg"
                onclick={() => (one_is_better = false)}>{data.two}</button
            >
            <button
                class="col-span-2 rounded-lg bg-gunmetal"
                onclick={() => submit()}>Submit Comparison</button
            >
        </div>
    </div>
{/if}
