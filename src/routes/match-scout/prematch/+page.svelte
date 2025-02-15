<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import Header from "../Header.svelte"
    import { localStore } from "@/localStore.svelte"
    import type {
        AutoActionData,
        TeleActionData,
        UncountedTeamMatch,
    } from "@/types"
    import type { PageProps } from "./$types"
    import { onMount } from "svelte"
    import { browser } from "$app/environment"

    let { data }: PageProps = $props()

    let team_color = $state(localStore<"blue" | "red" | "">("team_color", ""))

    let matchData = $state(
        localStore<UncountedTeamMatch>("matchData", {
            event_key: "",
            match_key: "",
            team_key: 0,
            auto_start_location: "Far",
            auto_leave_start: false,
            timeline: {
                auto: [] as AutoActionData[],
                tele: [] as TeleActionData[],
            },
            endgame: "None",
            skill: 3,
            notes: "",
            incap_time: [],
            scout_id: "",
            tagNames: [],
        })
    )

    onMount(() => {
        matchData.reset()
        matchData.value.event_key =
            (browser && localStorage.getItem("event_key")) || ""
        matchData.value.team_key = Number.parseInt(data.team_key)
        matchData.value.match_key = data.match_key
        team_color.value = data.color
    })

    const swipeHandler = (event: SwipeCustomEvent) => {
        if ((event.detail.direction = "left")) goto("/match-scout/auto")
    }
</script>

<div
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={swipeHandler}
    class="min-h-svh"
>
    <Header
        game_stage={"Prematch"}
        team_key={matchData.value.team_key}
        page_state="None"
        next_page={() => goto("/match-scout/auto")}
    />
    <!-- TODO Center Maybe -->
    <div class="grid flex-grow place-items-center overflow-y-scroll text-white">
        <div class="text-2xl">You're Scouting Team:</div>
        <div class="text-2xl text-{data.color}-400">
            {data.team_key}
        </div>
        <div class="text-xl">In {data.match_key.toUpperCase()}</div>
    </div>
</div>
