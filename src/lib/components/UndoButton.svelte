<script lang="ts">
    import type { Timeline } from "@/types"

    let { timeline = $bindable() }: { timeline: Timeline } = $props()
    const pop = (timeline: Timeline) => {
        if (timeline.tele.length > 0) {
            timeline.tele.pop()
        } else if (timeline.auto.length > 0) {
            timeline.auto.pop()
        }
    }
    const get_next = (timeline: Timeline) => {
        if (timeline.tele?.length > 0) {
            return timeline.tele[timeline.tele.length - 1]
        } else if (timeline.auto?.length > 0) {
            return timeline.auto[timeline.auto.length - 1]
        }
    }
</script>

{#if timeline.auto.length > 0 || timeline.tele.length > 0}
    <button onclick={() => pop(timeline)}>
        Undo: <span
            class={get_next(timeline)?.success
                ? "text-green-400"
                : "text-red-400"}
        >
            {get_next(timeline)?.action ?? ""}
        </span>
    </button>
{/if}
