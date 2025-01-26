<script lang="ts">
    import type { AutoActionData } from "$lib/types"
    import Action from "./Action.svelte"

    let {
        actions = $bindable(),
        displaying = $bindable(),
        furthest_auto_index = $bindable(),
    }: {
        actions: AutoActionData[] // TODO Action[]
        furthest_auto_index: number
        displaying: boolean
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

<button
    class="fixed inset-0 transition-all will-change-transform {displaying
        ? 'backdrop-blur'
        : 'translate-y-full'}"
    onclick={(e: Event) => {
        if (e.target === e.currentTarget) {
            displaying = false
        }
    }}
>
    <div
        class="no-scrollbar absolute inset-x-0 bottom-0 flex max-h-[80svh] min-h-[50svh] w-dvw flex-col items-center gap-3 overflow-y-scroll rounded-t-lg bg-gunmetal p-3 text-white"
        id="timeline"
    >
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
    </div>
</button>
