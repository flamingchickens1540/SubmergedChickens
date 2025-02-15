<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type {
        AutoActionData,
        EndAction,
        UncountedTeamMatch,
        TeleActionData,
    } from "$lib/types"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"
    import Rating from "@/components/Rating.svelte"
    import RadioGroup from "@/components/RadioGroup.svelte"
    import CheckGroup from "@/components/CheckGroup.svelte"

    import type { PageProps } from "./$types"
    import { localStore } from "@/localStore.svelte"

    let matchData = localStore<UncountedTeamMatch>("matchData", {
        event_key: "",
        match_key: "",
        team_key: 0,
        auto_start_location: "Far",
        auto_leave_start: false,
        timeline: {
            auto: [] as AutoActionData[],
            tele: [] as TeleActionData[],
        },
        endgame: "None",
        skill: 3,
        notes: "",
        incap_time: [],
        scout_id: "",
        tagNames: [],
    })

    let { data }: PageProps = $props()

    let displaying_timeline = $state(false)

    let possibleEndActions: EndAction[] = [
        "DeepClimb",
        "ShallowClimb",
        "Failed",
        "None",
    ]

    //TODO ADD TAGS TO THE MATCHDATA
    let selected: string[] = $state([])
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
    <div class="flex flex-grow flex-col gap-4 overflow-y-scroll p-4">
        <span class="font-heading text-xl font-semibold">End State</span>
        <RadioGroup
            bind:value={matchData.value.endgame}
            labels={possibleEndActions}
        ></RadioGroup>
        <Rating name="Driver Skill" bind:value={matchData.value.skill} />
        <span class="font-heading p-2 text-center text-3xl font-semibold"
            >Tags</span
        >
        <!-- TODO IMPLEMENT TAGS INTO MATCHDATA -->
        {#each data.tagcategories as tagcategory}
            <span class="font-heading text-xl font-semibold"
                >{tagcategory.category}</span
            >
            <CheckGroup labels={tagcategory.tags} bind:selected></CheckGroup>
        {/each}
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
