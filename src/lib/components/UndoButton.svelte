<script lang="ts">
    import type { AutoActionData, TeleActionData } from "@/types"

    let {
        timeline = $bindable(),
    }: { timeline: AutoActionData[] | TeleActionData[] } = $props()
</script>

<button onclick={() => timeline.pop()}>
    Undo: <span
        class={timeline[timeline?.length - 1]?.success
            ? "text-green-400"
            : "text-red-400"}
    >
        {timeline[timeline?.length - 1]?.action ?? ""}
    </span>
</button>
