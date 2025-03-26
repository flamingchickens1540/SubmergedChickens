<script lang="ts">
    import Drawer from "$lib/components/Drawer.svelte"
    import type { Timeline } from "$lib/types"
    import Action from "./Action.svelte"
    import { MoveDown, MoveUp } from "lucide-svelte"

    let {
        displaying = $bindable(),
        timeline = $bindable(),
    }: {
        displaying: boolean
        timeline: Timeline
    } = $props()

    function remove_auto(index: number) {
        timeline.auto.splice(index, 1)
    }

    function remove_tele(index: number) {
        timeline.tele.splice(index, 1)
    }

    function moveUp() {
        const firstTele = timeline.tele.shift()
        timeline.auto.push(firstTele!)
    }
    function moveDown() {
        const lastAuto = timeline.auto.pop()!
        // NOTE This function will never be called while the conversion is invalid
        // Thus our conversion is safe
        timeline.tele.unshift(lastAuto as any)
    }

    const auto_len = $derived(timeline.auto.length)
    const tele_len = $derived(timeline.tele.length)

    const lastAutoAction = $derived(timeline.auto[auto_len - 1].action)

    const disabled = "pointer-events-none opacity-30"
    const can_move_up: string = $derived(tele_len === 0 ? disabled : "")
    const can_move_down: string = $derived(
        auto_len === 0 ||
            lastAutoAction.includes("Intake") ||
            lastAutoAction == "LeaveStart"
            ? disabled
            : ""
    )
</script>

<Drawer bind:displaying>
    {#each timeline.tele as _, i}
        <Action
            action_data={timeline.tele[tele_len - i - 1]}
            index={tele_len - i - 1}
            remove={remove_tele}
        />
    {/each}
    {#if auto_len + tele_len > 0}
        <div class="flex w-full justify-evenly rounded bg-gunmetal p-2">
            <button class={can_move_up} onclick={moveUp}><MoveUp /></button>
            <button class={can_move_down} onclick={moveDown}
                ><MoveDown /></button
            >
        </div>
    {/if}
    {#each timeline.auto as _, i}
        <Action
            action_data={timeline.auto[auto_len - i - 1]}
            index={auto_len - i - 1}
            remove={remove_auto}
        />
    {/each}
    {#if auto_len + tele_len === 0}
        <h3 class="font-heading p-2 font-bold">No actions yet :3</h3>
    {/if}
</Drawer>
