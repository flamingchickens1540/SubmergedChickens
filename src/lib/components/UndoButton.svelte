<script lang="ts">
    import type {
        FrontendAutoActionData,
        FrontendTeleActionData,
    } from "@/types"

    let {
        timeline = $bindable(),
    }: { timeline: FrontendAutoActionData[] | FrontendTeleActionData[] } =
        $props()
</script>

{#if timeline.length > 0}
    <button onclick={() => timeline.pop()}>
        Undo: <span
            class={timeline[timeline?.length - 1]?.success
                ? "text-green-400"
                : "text-red-400"}
        >
            {timeline[timeline?.length - 1]?.action ?? ""}
        </span>
    </button>
{/if}
