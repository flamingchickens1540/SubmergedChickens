<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { AutoAction, EndAction } from "$lib/types"
    import Header from "../Header.svelte"
    import Timeline from "../Timeline.svelte"

    let displaying_timeline = $state(false)
    let actions: AutoActionData[] = $state([])
    let furthest_auto_index = 0

    let possibleEndActions: EndAction[] = [
        "DeepClimb",
        "ShallowClimb",
        "Failed",
        "None",
    ]
    let endAction: EndAction = $state("None")
    let driverSkill = $state(0)
    let mechanismBroke = $state(false)
</script>

<div
    class="mx-auto flex min-h-svh max-w-md flex-col"
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={(event: SwipeCustomEvent) => {
        if ((event.detail.direction = "right")) goto("/match-scout/tele")
    }}
>
    <Header
        game_stage={"Postmatch"}
        team_name={1540}
        prev_page={() => goto("/match-scout/tele")}
    />
    <div class="flex flex-grow flex-col gap-4 p-4">
        <div class="flex flex-col gap-2 p-2">
            <span class="font-heading text-xl font-semibold">End State</span>
            {#each possibleEndActions as action}
                <label class="mx-1">
                    <input
                        type="radio"
                        name="end action"
                        value={action}
                        bind:group={endAction}
                    />
                    {action.replace(/([A-Z])/g, " $1").trim()}
                </label>
            {/each}
        </div>
        <label class="flex flex-col gap-1 p-2">
            <span class="font-heading text-xl font-semibold">Driver Skill</span>
            <input type="range" min="0" max="5" bind:value={driverSkill} />
        </label>
        <label class="flex gap-1 p-2">
            <input type="checkbox" bind:checked={mechanismBroke} />
            <span class="font-heading text-lg font-semibold"
                >Mechanism Broke</span
            >
        </label>
        <button class="mt-auto rounded bg-gunmetal p-2 text-lg font-semibold">
            Submit
        </button>
    </div>

    <button
        class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline
        bind:actions
        bind:displaying={displaying_timeline}
        bind:furthest_auto_index
    />
</div>
