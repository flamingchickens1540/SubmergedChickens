<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import Header from "../Header.svelte"
    import { localStore } from "@/localStore.svelte"
    import type { UncountedTeamMatch } from "@/types"
    import type { PageProps } from "./$types"
    import { onMount } from "svelte"
    import { browser } from "$app/environment"
    import { AutoStart, Endgame } from "@prisma/client"

    let { data }: PageProps = $props()

    let team_color = $state(localStore<"blue" | "red" | "">("team_color", ""))

    // TODO Add auto start location to prematch
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

    onMount(() => {
        matchData.reset()

        matchData.value.scout_id = Number.parseInt(
            (browser && localStorage.getItem("scout_id")) || ""
        )
        matchData.value.event_key =
            (browser && localStorage.getItem("event_key")) || ""
        matchData.value.team_key = Number.parseInt(data.team_key)
        matchData.value.match_key = data.match_key

        team_color.value = data.color
    })

    const swipeHandler = (event: SwipeCustomEvent) => {
        if ((event.detail.direction = "left")) goto("/match-scout/auto")
    }

    console.log(data.color)
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
    <div class="grid flex-grow place-items-center overflow-y-scroll">
        <div class="text-2xl">You're Scouting Team:</div>
        <div
            style={data.color === "blue"
                ? "color: #2196F3 !important"
                : "color: #F44336 !important"}
            class="text-6xl font-semibold"
        >
            {data.team_key}
        </div>
        <div class="text-xl">In {data.match_key.toUpperCase()}</div>
    </div>
</div>
