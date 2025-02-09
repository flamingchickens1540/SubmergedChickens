<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import Header from "../Header.svelte"
    import { localStore } from "@/localStore.svelte"
    import { type TeamMatchData } from "@/types"

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
        next_page={() => goto("/match-scout/auto")}
    />
</div>
