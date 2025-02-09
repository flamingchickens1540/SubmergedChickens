<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { AutoAction, AutoActionData, EndAction, TeamMatchData } from "$lib/types"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"
    import { localStore } from "@/localStore.svelte"

    let matchData = $state(localStore<TeamMatchData>("matchData", {
        scout_id: "",
        team_key: "",
        match_key: "",
        timeline: {
            auto: [],
            tele: [],
        },
        end: "None",
        driver_skill: 3,
        notes: "",
        tags: [],
    }))

    let displaying_timeline = $state(false)
    let furthest_auto_index = $state(0)
</script>

<div
    class="flex min-h-dvh flex-col"
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
            class="border-red w-full flex-grow rounded bg-gunmetal p-1"
            placeholder="notes..."
            bind:value={matchData.value.notes}
        ></textarea>

        <button class="mt-auto rounded bg-gunmetal py-4 text-lg font-semibold">
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
        bind:actions={matchData.value.timeline.auto} 
        bind:displaying={displaying_timeline}
        bind:furthest_auto_index
    />
</div>
