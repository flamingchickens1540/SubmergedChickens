<script lang="ts">
    import type { UncountedTeamMatch } from "$lib/types"
    import Timeline from "./Timeline.svelte"
    import Rating from "@/components/Rating.svelte"
    import RadioGroup from "@/components/RadioGroup.svelte"
    import CheckGroup from "@/components/CheckGroup.svelte"
    import { Endgame, type Tag } from "@prisma/client"

    const {
        tags,
        match_data = $bindable(),
    }: {
        tags: Tag[]
        match_data: UncountedTeamMatch
    } = $props()

    let displaying_timeline = $state(false)
</script>

<div
    class="flex flex-grow select-none flex-col gap-2 overflow-y-scroll px-4 py-2"
>
    <span class="font-heading text-center text-xl font-semibold">End State</span
    >
    <RadioGroup bind:value={match_data.endgame} labels={Object.keys(Endgame)}
    ></RadioGroup>
    <Rating name="Driver Skill" bind:value={match_data.skill} />
    <!-- <span class="font-heading p-2 text-center text-3xl font-semibold">Tags</span -->
    <!-- > -->
    <CheckGroup labels={tags} bind:selected={match_data.tags}></CheckGroup>

    <button
        class="font-heading w-full border-t-2 border-white/10 pb-1 pt-2 text-center text-lg font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline
        bind:displaying={displaying_timeline}
        bind:timeline={match_data.timeline}
    />
</div>
