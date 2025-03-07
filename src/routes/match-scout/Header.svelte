<script lang="ts">
    import type {
        AutoPageState,
        FrontendTeleActionData,
        FrontendAutoActionData,
    } from "$lib/types"
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
        timeline?: FrontendAutoActionData[] | FrontendTeleActionData[]
    } = $props()
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
        <UndoButton {timeline} />
    {/if}
    <div class="align-item-center flex gap-2">
        <button
            onclick={prev_page}
            class="disabled:opacity-30"
            disabled={prev_page == null}
        >
            <ArrowLeft />
        </button>
        <span
            >{page_state == "None" || page_state == null
                ? game_stage == "Prematch"
                    ? "Prematch"
                    : game_stage.slice(0, 4)
                : page_state}</span
        >
        <button
            onclick={next_page}
            class={next_page == null ? "pointer-events-none opacity-30" : ""}
        >
            <ArrowRight />
        </button>
    </div>
</header>
