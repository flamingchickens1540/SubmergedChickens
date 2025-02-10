<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import Header from "../Header.svelte"
    import { localStore } from "@/localStore.svelte"
    import { type TeamMatchData } from "@/types"
    import type { PageProps } from "./$types"
    import { onMount } from "svelte"

    let { data }: PageProps = $props()

    let team_color = $state(localStore<"blue" | "red" | "">("team_color", ""))

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

    onMount(() => {
        matchData.value.team_key = data.team_key
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
        team_name={matchData.value.team_key}
        page_state="None"
        next_page={() => goto("/match-scout/auto")}
    />
    <!-- TODO Center Maybe -->
    <div
        class="grid flex-grow grid-cols-1 grid-rows-3 place-items-center text-white"
    >
        <div class="text-2xl">You're Scouting Team:</div>
        <div class="text-2xl text-{data.color}-400">
            {data.team_key}
        </div>
        <div class="text-xl">In {data.match_key.toUpperCase()}</div>
    </div>
</div>
