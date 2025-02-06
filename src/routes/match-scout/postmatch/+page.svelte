<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { AutoActionData, EndAction } from "$lib/types"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"
    import Rating from "@/components/Rating.svelte"
    import RadioGroup from "@/components/RadioGroup.svelte"
    import CheckGroup from "@/components/CheckGroup.svelte"

    import type { PageProps } from "./$types"

    let { data }: PageProps = $props()

    let displaying_timeline = $state(false)
    let actions: AutoActionData[] = $state([])
    let furthest_auto_index = $state(0)

    let possibleEndActions: EndAction[] = [
        "DeepClimb",
        "ShallowClimb",
        "Failed",
        "None",
    ]
    let endState: EndAction = $state("None")
    let driverSkill = $state(0)
</script>

<div
    class="flex min-h-dvh flex-col"
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={(event: SwipeCustomEvent) => {
        switch (event.detail.direction) {
            case "right":
                goto("/match-scout/tele")
                break
            case "left":
                goto("/match-scout/notes")
                break
        }
    }}
>
    <Header
        game_stage={"Postmatch"}
        team_name={"1540"}
        prev_page={() => goto("/match-scout/tele")}
        next_page={() => goto("/match-scout/notes")}
    />
    <div class="flex flex-grow flex-col gap-4 p-4">
        <span class="font-heading text-xl font-semibold">End State</span>
        <RadioGroup bind:value={endState} labels={possibleEndActions}
        ></RadioGroup>
        <Rating name="Driver Skill" value={driverSkill} />
        <span class="font-heading mt-4 text-center text-2xl font-semibold"
            >Tags</span
        >
        {#each data.tagcategories as tagcategory}
            <span class="font-heading text-xl font-semibold"
                >{tagcategory.category}</span
            >
            <CheckGroup labels={tagcategory.tags} selected={[]}></CheckGroup>
        {/each}
    </div>

    <button
        class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline
        bind:actions
        bind:displaying={displaying_timeline}
        bind:furthest_auto_index
    />
</div>
