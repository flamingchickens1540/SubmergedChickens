<script lang="ts">
    import Drawer from "$lib/components/Drawer.svelte"
    import type { UncountedTeamMatch } from "$lib/types"
    import { localStore } from "@/localStore.svelte"
    import Action from "./Action.svelte"

    let matchData = $state(
        localStore<UncountedTeamMatch>("matchData", {
            event_key: "",
            match_key: "",
            team_key: 0,
            auto_start_location: "Far",
            auto_leave_start: false,
            timeline: {
                auto: [],
                tele: [],
            },
            endgame: "None",
            skill: 3,
            notes: "",
            incap_time: [],
            scout_id: 0,
            tags: [],
        })
    )
    let {
        displaying = $bindable(),
        bg,
    }: {
        displaying: boolean
        bg: string | undefined
    } = $props()

    /// Determine if currying is the right solution or if we should use a binding
    function remove(index: number) {
        if (index < auto_len) {
            matchData.value.timeline.auto.splice(index, 1)
        } else {
            matchData.value.timeline.tele.splice(index - auto_len, 1)
        }
    }

    function shift(index: number, change: -1 | 1) {
        const [actions, new_index] =
            index < auto_len
                ? [matchData.value.timeline.auto, index]
                : [matchData.value.timeline.tele, index - auto_len]

        if (new_index == 0 && change == -1) return
        ;[actions[new_index], actions[new_index + change]] = [
            actions[new_index + change],
            actions[new_index],
        ]
    }

    const auto_len = $derived(matchData.value.timeline.auto.length)
    const tele_len = $derived(matchData.value.timeline.tele.length)
</script>

<Drawer bind:displaying {bg}>
    {#each matchData.value.timeline.tele as _, i}
        <Action
            action_data={matchData.value.timeline.tele[tele_len - i - 1]}
            index={tele_len - i - 1}
            sub_timeline_len={tele_len}
            {remove}
            {shift}
        />
    {/each}
    <hr />
    {#each matchData.value.timeline.auto as _, i}
        <Action
            action_data={matchData.value.timeline.auto[auto_len - i - 1]}
            index={auto_len - i - 1}
            sub_timeline_len={auto_len}
            {remove}
            {shift}
        />
    {/each}
    {#if auto_len + tele_len === 0}
        <h3 class="font-heading m-auto font-bold">No actions yet :3</h3>
    {/if}
</Drawer>
