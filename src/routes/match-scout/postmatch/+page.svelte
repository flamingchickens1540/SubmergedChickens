<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { UncountedTeamMatch } from "$lib/types"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"
    import Rating from "@/components/Rating.svelte"
    import RadioGroup from "@/components/RadioGroup.svelte"
    import CheckGroup from "@/components/CheckGroup.svelte"

    import type { PageProps } from "./$types"
    import { localStore } from "@/localStore.svelte"
    import { AutoStart, Endgame } from "@prisma/client"

    let matchData = localStore<UncountedTeamMatch>("matchData", {
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
        tagNames: [],
    })

    let { data }: PageProps = $props()

    let displaying_timeline = $state(false)

    //TODO ADD TAGS TO THE MATCHDATA
    let roles: string[] = $state([])
    let matchplay: string[] = $state([])
    let damage: string[] = $state([])
</script>

<div
    class="flex h-dvh flex-col"
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={(event: SwipeCustomEvent) => {
        switch (event.detail.direction) {
            case "right":
                goto("/match-scout/tele")
                break
            case "left":
                goto("/match-scout/notes")
                break
        }
    }}
>
    <Header
        game_stage={"Postmatch"}
        page_state="None"
        team_key={matchData.value.team_key}
        prev_page={() => goto("/match-scout/tele")}
        next_page={() => goto("/match-scout/notes")}
        bind:timeline={matchData.value.timeline.tele}
    />
    <div class="flex flex-grow flex-col gap-8 overflow-y-scroll p-4">
        <RadioGroup
            title={"End State"}
            bind:value={matchData.value.endgame}
            labels={Object.keys(Endgame)}
        ></RadioGroup>
        <Rating name="Driver Skill" bind:value={matchData.value.skill} />
        <div class="flex flex-col gap-4">
            <span class="font-heading px-2 text-center text-3xl font-semibold"
                >Tags</span
            >

            <!-- TODO IMPLEMENT TAGS INTO MATCHDATA -->
            {#each data.tagcategories as tagcategory, i}
                <!-- TODO THIS DOESN"T ACTUALLY WORK NEED TO GET TAGS WORKING -->
                <CheckGroup
                    title={tagcategory.category}
                    labels={tagcategory.tags}
                    bind:selected={roles}
                ></CheckGroup>
            {/each}
        </div>
    </div>

    <button
        class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline bind:displaying={displaying_timeline} />
</div>
