<script lang="ts">
    import type { AutoPageState, UncountedTeamMatch } from "@/types"
    import Prematch from "./Prematch.svelte"
    import { AutoStart, Endgame } from "@prisma/client"
    import type { PageProps } from "./$types"
    import Tele from "./Tele.svelte"
    import Auto from "./Auto.svelte"
    import Postmatch from "./Postmatch.svelte"
    import Notes from "./Notes.svelte"
    import Header from "./Header.svelte"
    import { LocalStore, localStore } from "@/localStore.svelte"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import { onMount } from "svelte"

    const { data }: PageProps = $props()

    const scout_id: LocalStore<number> = $state(localStore("scout_id", -1))
    let match_data: LocalStore<UncountedTeamMatch> = $state(
        localStore("match_data", {
            match_key: data.match_key,
            team_key: data.team_key,
            auto_start_location: AutoStart.Far,
            auto_leave_start: true,
            timeline: {
                auto: [],
                tele: [],
            },
            endgame: Endgame.None,
            skill: 3,
            notes: "",
            incap_time: [],
            scout_id: scout_id.value,
            tags: [],
        })
    )
    onMount(() => {
        match_data.value.match_key = data.match_key
        match_data.value.team_key = data.team_key
    })

    let game_stage: LocalStore<"Pre" | "Auto" | "Tele" | "Post" | "Notes"> =
        $state(localStore("game_stage", "Pre"))

    function next_game_stage() {
        game_stage.value =
            game_stage.value === "Pre"
                ? "Auto"
                : game_stage.value === "Auto"
                  ? "Tele"
                  : game_stage.value === "Tele"
                    ? "Post"
                    : "Notes"
    }
    function prev_game_stage() {
        game_stage.value =
            game_stage.value === "Notes"
                ? "Post"
                : game_stage.value === "Post"
                  ? "Tele"
                  : game_stage.value === "Tele"
                    ? "Auto"
                    : "Pre"
    }
    function swipeHandler(event: SwipeCustomEvent) {
        if ((event.detail.direction = "left")) prev_game_stage()
        else if ((event.detail.direction = "right")) next_game_stage()
    }
</script>

<div
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={swipeHandler}
    class="flex min-h-svh flex-col"
>
    <Header
        game_stage={game_stage.value}
        color={data.color}
        team_key={match_data.value.team_key}
        prev_page={prev_game_stage}
        next_page={next_game_stage}
        bind:timeline={match_data.value.timeline}
    />

    {#if game_stage.value === "Pre"}
        <Prematch color={data.color} bind:match_data={match_data.value} />
    {:else if game_stage.value === "Auto"}
        <Auto color={data.color} bind:match_data={match_data.value} />
    {:else if game_stage.value === "Tele"}
        <Tele bind:match_data={match_data.value} />
    {:else if game_stage.value === "Post"}
        <Postmatch tags={data.tags} bind:match_data={match_data.value} />
    {:else if game_stage.value === "Notes"}
        <!-- This is intentional, since we want to reset the stores -->
        <Notes bind:match_data bind:game_stage />
    {/if}
</div>
