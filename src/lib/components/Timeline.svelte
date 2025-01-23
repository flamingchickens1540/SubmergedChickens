<script lang="ts">
    import type {
        AutoActionData,
        AutoHeldItems,
        TeleHeldItems,
    } from "$lib/types"
    import Action from "./Action.svelte"

    let {
        actions = $bindable(),
        held = $bindable(),
        furthest_auto_index = $bindable(),
        displaying = $bindable(),
    }: {
        actions: AutoActionData[]
        held: AutoHeldItems | TeleHeldItems
        furthest_auto_index: number
        displaying: boolean
    } = $props()

    /// Determine if currying is the right solution or if we should use a binding
    function remove(index: number) {
        if (furthest_auto_index >= index) furthest_auto_index--
        actions.splice(index, 1)
    }
</script>

<button
    class="fixed inset-0 transition-all will-change-transform {displaying
        ? 'backdrop-blur'
        : 'translate-y-full'}"
>
    <div
        class="no-scrollbar absolute inset-x-0 bottom-0 flex h-[50dvh] w-dvw flex-col items-center gap-3 overflow-y-scroll rounded-t-lg bg-gunmetal p-3 text-white"
        id="timeline"
    >
        {#each actions as _, i}
            <Action
                action_data={actions[actions.length - i - 1]}
                index={actions.length - i - 1}
                {remove}
            />
            {#if furthest_auto_index === actions.length - i - 1}
                <hr />
            {/if}
        {/each}
        {#if actions.length === 0}
            <h3 class="font-heading m-auto font-bold">No actions yet :3</h3>
        {/if}
    </div>
</button>
