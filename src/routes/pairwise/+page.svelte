<script lang="ts">
    import type { Comparison } from "@prisma/client"
    import type { PageProps } from "./$types"
    import { goto } from "$app/navigation"
    import { localStore } from "@/localStore.svelte"

    const { data }: PageProps = $props()

    let diff = $state(0)
    const scout_id = localStore("scout_id", 0)

    let category = $state(data.categories.shift()!)

    const submit = async () => {
        const comp: Omit<Comparison, "id"> = {
            team_A_team_key: data.one,
            team_A_match_key: data.one_match,
            team_B_team_key: data.two,
            team_B_match_key: data.two_match,
            // TODO Figure out how to want to manage diff
            // (Can |diff| > 1)
            diff,
            category: category,
            event_key: data.event_key,
            user_id: scout_id.value,
        }
        console.log(comp)

        const res = await fetch("/api/pairwise/submit", {
            method: "POST",
            body: JSON.stringify(comp),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (data.categories.length === 0 || !res.ok) goto("/home")

        category = data.categories.shift()!
    }
</script>

<div class="flex h-dvh flex-col gap-2 p-2 text-center">
    <span class="col-span-2 text-lg">
        Which robot is better at <b class="font-bold">offense</b>
    </span>
    <div class="grid h-dvh grid-cols-2 grid-rows-5 gap-2 text-xl font-semibold">
        <button
            class="{diff === 1
                ? 'bg-green-500'
                : 'bg-gunmetal'} row-span-4 rounded-lg"
            onclick={() => {
                if (diff === 1) {
                    diff = 0
                } else {
                    diff = 1
                }
            }}>{data.one}</button
        >
        <button
            class="{diff === -1
                ? 'bg-green-500'
                : 'bg-gunmetal'} row-span-4 rounded-lg"
            onclick={() => {
                if (diff === -1) {
                    diff = 0
                } else {
                    diff = -1
                }
            }}>{data.two}</button
        >

        <button
            class="col-span-2 rounded-lg bg-gunmetal"
            onclick={() => submit()}
        >
            {#if diff == 0}
                I don't know
            {:else}
                Submit Comparison
            {/if}
        </button>
    </div>
</div>
