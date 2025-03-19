<script lang="ts">
    import { browser } from "$app/environment"
    import type { Comparison } from "@prisma/client"
    import type { PageProps } from "./$types"
    import { goto } from "$app/navigation"
    import { localStore } from "@/localStore.svelte"

    const { data }: PageProps = $props()

    let one_is_better = $state(false)
    const scout_id = localStore("scout_id", 0)

    const submit = async () => {
        const category = data.categories.shift()
        console.log(data.event_key)
        const comp: Omit<Comparison, "id"> = {
            team_A_team_key: data.one,
            team_A_match_key: data.event_key + "_" + data.one_match!,
            team_B_team_key: data.two,
            team_B_match_key: data.two_match!,
            // TODO Figure out how to want to manage diff
            diff: 1,
            category: category!.name!,
            event_key: data.event_key!,
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
    }
</script>

{#if data.categories.length < 1}
    <span>TODO: redirect or something</span>
{:else}
    <div class="flex h-dvh flex-col gap-2 p-2 text-center">
        <span class="col-span-2 text-lg">
            Select the better <b class="font-bold">{data.categories[0].name}</b>
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
