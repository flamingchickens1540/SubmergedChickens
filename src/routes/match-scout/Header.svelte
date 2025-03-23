<script lang="ts">
    import type { AutoPageState, Timeline } from "$lib/types"
    import UndoButton from "@/components/UndoButton.svelte"
    import { localStore } from "@/localStore.svelte"
    import { ArrowRight, ArrowLeft } from "lucide-svelte"

    let team_color = $state(localStore<"blue" | "red" | "">("team_color", ""))

    let {
        team_key,
        game_stage,
        page_state = $bindable(),
        next_page,
        prev_page,
        timeline = $bindable(),
    }: {
        team_key: number
        game_stage: string
        page_state: AutoPageState
        prev_page?: () => void
        next_page?: () => void
        timeline?: Timeline
    } = $props()

    const disabled = "pointer-events-none opacity-30"
    const can_next = $derived(game_stage === "Notes" ? disabled : "")
    const can_prev = $derived(game_stage === "Prematch" ? disabled : "")
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <span
        style={team_color.value === "blue"
            ? "color: #2196F3 !important"
            : "color: #F44336 !important"}
    >
        {team_key}
    </span>
    {#if timeline}
        <UndoButton bind:timeline />
    {/if}
    <div class="align-item-center flex gap-2">
        <button onclick={prev_page} class={can_prev}>
            <ArrowLeft />
        </button>
        <span class="select-none">{game_stage}</span>
        <button onclick={next_page} class={can_next}>
            <ArrowRight />
        </button>
    </div>
</header>
