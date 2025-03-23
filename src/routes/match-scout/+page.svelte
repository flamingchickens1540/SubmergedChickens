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

    const { data }: PageProps = $props()

    let match_data: UncountedTeamMatch = $state({
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

    let game_stage: "prematch" | "auto" | "tele" | "post" | "notes" =
        $state("prematch")
    let page_state: AutoPageState = $state("None")

    function next_game_stage() {
        game_stage =
            game_stage === "prematch"
                ? "auto"
                : game_stage === "auto"
                  ? "tele"
                  : game_stage === "tele"
                    ? "post"
                    : "notes"
    }
    function prev_game_stage() {
        game_stage =
            game_stage === "notes"
                ? "post"
                : game_stage === "post"
                  ? "tele"
                  : game_stage === "tele"
                    ? "auto"
                    : "prematch"
    }
</script>

<Header
    {game_stage}
    {page_state}
    team_key={match_data.team_key}
    prev_page={next_game_stage}
    next_page={prev_game_stage}
    bind:timeline={match_data.timeline}
/>

{#if game_stage === "prematch"}
    <Prematch
        color={data.color}
        bind:match_data
    />{:else if game_stage === "auto"}
    <Auto color={data.color} bind:match_data />
{:else if game_stage === "tele"}
    <Tele bind:match_data />{:else if game_stage === "post"}
    <Postmatch
        tags={data.tags}
        bind:match_data
    />{:else if game_stage === "notes"}
    <Notes bind:match_data />{/if}
