<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { TeamMatchData } from "@/types.ts"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"
    import { localStore } from "@/localStore.svelte"

    let matchData = $state(
        localStore<TeamMatchData>("matchData", {
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
        })
    )

    let displaying_timeline = $state(false)

    const submit = () => {
        console.log(matchData.value)
        // TODO Submit data to backend
        const match_key = matchData
        matchData.reset()
        goto("/pairwise")
    }
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
        team_name={matchData.value.team_key}
        page_state="None"
        prev_page={() => goto("/match-scout/postmatch")}
        bind:timeline={matchData.value.timeline.tele}
    />
    <div class="m-2 flex flex-grow flex-col gap-2 rounded p-2">
        <span class="font-heading text-xl font-semibold">Notes</span>

        <textarea
            class="w-full flex-grow rounded bg-gunmetal p-2"
            placeholder="Notes..."
            bind:value={matchData.value.notes}
        ></textarea>

        <button
            onclick={submit}
            class="mt-auto rounded bg-gunmetal p-2 text-lg font-semibold"
        >
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
    <Timeline bind:displaying={displaying_timeline} />
</div>
