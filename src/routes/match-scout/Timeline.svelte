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
            tagNames: [],
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

    function move(index: number) {
        if (index >= auto_len) {
            matchData.value.timeline.auto.push(
                matchData.value.timeline.tele.splice(index - auto_len, 1)[0]
            )
        } else {
            matchData.value.timeline.tele.unshift(
                matchData.value.timeline.auto.splice(index, 1)[0]
            )
        }
    }

    const auto_len = $derived(matchData.value.timeline.auto.length)
    const tele_len = $derived(matchData.value.timeline.tele.length)
</script>

<Drawer bind:displaying {bg}>
    {#each matchData.value.timeline.tele as _, i}
        <Action
            action_data={matchData.value.timeline.tele[tele_len - i - 1]}
            period={"tele"}
            index={tele_len + auto_len - i - 1}
            {remove}
            {move}
        />
    {/each}
    <hr />
    {#each matchData.value.timeline.auto as _, i}
        <Action
            action_data={matchData.value.timeline.auto[auto_len - i - 1]}
            period={"auto"}
            index={auto_len - i - 1}
            {remove}
            {move}
        />
    {/each}
    {#if auto_len + tele_len === 0}
        <h3 class="font-heading m-auto font-bold">No actions yet :3</h3>
    {/if}
</Drawer>
