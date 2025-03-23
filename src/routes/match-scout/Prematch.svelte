<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { UncountedTeamMatch } from "@/types"

    const {
        color,
        match_data = $bindable(),
    }: { color: "red" | "blue"; match_data: UncountedTeamMatch } = $props()

    const swipeHandler = (event: SwipeCustomEvent) => {
        if ((event.detail.direction = "left")) goto("/match-scout/auto")
    }
</script>

<div
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={swipeHandler}
    class="min-h-svh"
>
    <div class="grid flex-grow place-items-center overflow-y-scroll">
        <div class="text-2xl">You're Scouting Team:</div>
        <div
            style={color === "blue"
                ? "color: #2196F3 !important"
                : "color: #F44336 !important"}
            class="text-6xl font-semibold"
        >
            {match_data.team_key}
        </div>
        <div class="text-xl">In {match_data.match_key.toUpperCase()}</div>
    </div>
</div>
