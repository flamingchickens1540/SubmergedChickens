<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { UncountedTeamMatch } from "$lib/types"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"
    import { localStore } from "@/localStore.svelte"
    import { AutoStart, Endgame } from "@prisma/client"

    let matchData = $state(
        localStore<UncountedTeamMatch>("matchData", {
            event_key: "",
            match_key: "",
            team_key: 0,
            auto_start_location: AutoStart.Far,
            auto_leave_start: false,
            timeline: {
                auto: [],
                tele: [],
            },
            endgame: Endgame.None,
            skill: 3,
            notes: "",
            incap_time: [],
            scout_id: 0,
            tags: [],
        })
    )

    let displaying_timeline = $state(false)

    const submit = async () => {
        await fetch("/api/submitMatch", {
            method: "POST",
            body: JSON.stringify(matchData.value),
            headers: {
                "Content-Type": "application/json",
            },
        })

        matchData.reset()
        goto("/home")
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
        team_key={matchData.value.team_key}
        page_state="None"
        prev_page={() => goto("/match-scout/postmatch")}
        bind:timeline={matchData.value.timeline}
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
