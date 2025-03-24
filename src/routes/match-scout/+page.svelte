<script lang="ts">
    import type {
        AutoPageState,
        TelePageState,
        UncountedTeamMatch,
    } from "@/types"
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

    const { data }: PageProps = $props()

    const scout_id: LocalStore<number> = $state(localStore("scout_id", -1))

    let match_data: UncountedTeamMatch = $state({
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

    let game_stage: "Prematch" | "Auto" | "Tele" | "Post" | "Notes" =
        $state("Prematch")
    let page_state: AutoPageState = $state("None")

    function next_game_stage() {
        game_stage =
            game_stage === "Prematch"
                ? "Auto"
                : game_stage === "Auto"
                  ? "Tele"
                  : game_stage === "Tele"
                    ? "Post"
                    : "Notes"
    }
    function prev_game_stage() {
        game_stage =
            game_stage === "Notes"
                ? "Post"
                : game_stage === "Post"
                  ? "Tele"
                  : game_stage === "Tele"
                    ? "Auto"
                    : "Prematch"
    }
    function swipeHandler(event: SwipeCustomEvent) {
        if ((event.detail.direction = "left")) prev_game_stage()
        else if ((event.detail.direction = "right")) next_game_stage()
    }
</script>

<div
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={swipeHandler}
    class="min-h-svh"
>
    <Header
        {game_stage}
        {page_state}
        color={data.color}
        team_key={match_data.team_key}
        prev_page={prev_game_stage}
        next_page={next_game_stage}
        bind:timeline={match_data.timeline}
    />

    {#if game_stage === "Prematch"}
        <Prematch color={data.color} bind:match_data />
    {:else if game_stage === "Auto"}
        <Auto color={data.color} bind:match_data />
    {:else if game_stage === "Tele"}
        <Tele bind:match_data />
    {:else if game_stage === "Post"}
        <Postmatch tags={data.tags} bind:match_data />
    {:else if game_stage === "Notes"}
        <div class="flex min-h-dvh flex-col">
            <Notes bind:match_data />
        </div>
    {/if}
</div>
