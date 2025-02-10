<script lang="ts">
    import type {
        TelePageState,
        AutoPageState,
        AutoAction,
        TeleActionData,
        AutoActionData,
    } from "$lib/types"
    import UndoButton from "@/components/UndoButton.svelte"
    import { ArrowRight, ArrowLeft } from "lucide-svelte"

    let {
        team_name,
        game_stage,
        page_state = $bindable(),
        next_page,
        prev_page,
        timeline = $bindable(),
    }: {
        team_name: String
        game_stage: String
        page_state: AutoPageState
        prev_page?: () => void
        next_page?: () => void
        timeline?: AutoActionData[] | TeleActionData[]
    } = $props()
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <span class="">
        {team_name}
    </span>
    {#if timeline}
        <UndoButton {timeline} />
    {/if}
    <div class="align-item-center flex gap-2">
        <button
            onclick={prev_page}
            class={prev_page == null ? "pointer-events-none opacity-30" : ""}
        >
            <ArrowLeft />
        </button>
        <span
            >{page_state == "None" || page_state == null
                ? game_stage == "Prematch"
                    ? "Pre"
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
