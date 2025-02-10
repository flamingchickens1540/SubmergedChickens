<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import Header from "../Header.svelte"
<<<<<<< Updated upstream
=======
    import { localStore } from "@/localStore.svelte"
    import { type TeamMatchData } from "@/types"
    import type { PageProps } from "./$types"

    let { data }: PageProps = $props()

    let matchData = $state(
        localStore<TeamMatchData>("matchData", {
            scout_id: "",
            team_key: data.team_key,
            match_key: data.match_key,
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
>>>>>>> Stashed changes

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
        team_name={1540}
        next_page={() => goto("/match-scout/auto")}
    />
</div>
