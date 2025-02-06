<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { AutoAction, AutoActionData, EndAction } from "$lib/types"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"

    let displaying_timeline = $state(false)
    let actions: AutoActionData[] = $state([])
    let furthest_auto_index = 0

    let notes = $state("")

    $effect(() => {
        console.log(notes)
    })
</script>

<div
    class="flex min-h-dvh flex-col bg-eerie_black accent-eminence bg-mix-eminence bg-mix-amount-10"
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={(event: SwipeCustomEvent) => {
        if ((event.detail.direction = "right")) goto("/match-scout/postmatch")
    }}
>
    <Header
        game_stage={"Notes"}
        team_name={"1540"}
        prev_page={() => goto("/match-scout/postmatch")}
    />
    <div class="flex flex-grow flex-col gap-4 p-4">
        <span class="font-heading text-xl font-semibold">Notes</span>

        <textarea
            class="border-red w-full flex-grow rounded bg-eerie_black"
            bind:value={notes}
        ></textarea>

        <button class="mt-auto rounded bg-gunmetal p-5 text-lg font-semibold">
            Submit
        </button>
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
