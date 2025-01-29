<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import Header from "../Header.svelte"

    const swipeHandler = (event: SwipeCustomEvent) => {
        if ((event.detail.direction = "right")) goto("/match-scout/tele")
    }
</script>

<div
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={swipeHandler}
    class="min-h-svh"
>
    <Header
        game_stage={"Postmatch"}
        team_name={1540}
        prev_page={() => goto("/match-scout/tele")}
    />
</div>
