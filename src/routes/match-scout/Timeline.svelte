<script lang="ts">
    import Drawer from "$lib/components/Drawer.svelte"
    import type { AutoActionData } from "$lib/types"
    import Action from "./Action.svelte"

    let {
        actions = $bindable(),
        displaying = $bindable(),
        furthest_auto_index = $bindable(),
        bg = "bg-eerie_black",
    }: {
        actions: AutoActionData[] // TODO Action[]
        furthest_auto_index: number
        displaying: boolean
        bg: string
    } = $props()

    /// Determine if currying is the right solution or if we should use a binding
    function remove(index: number) {
        if (furthest_auto_index >= index) furthest_auto_index--
        actions.splice(index, 1)
    }

    function shift(index: number, change: -1 | 1) {
        ;[actions[index], actions[index + change]] = [
            actions[index + change],
            actions[index],
        ]
    }
</script>

<Drawer bind:displaying {bg}>
    {#each actions as _, i}
        <Action
            action_data={actions[actions.length - i - 1]}
            index={actions.length - i - 1}
            {remove}
            {shift}
        />
        {#if furthest_auto_index === actions.length - i - 1}
            <hr />
        {/if}
    {/each}
    {#if actions.length === 0}
        <h3 class="font-heading m-auto font-bold">No actions yet :3</h3>
    {/if}
</Drawer>
