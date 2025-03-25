<script lang="ts">
    import type { UncountedTeamMatch } from "@/types"

    const {
        color,
        match_data = $bindable(),
    }: { color: "red" | "blue"; match_data: UncountedTeamMatch } = $props()
</script>

<div class="flex flex-1 flex-col place-items-center overflow-y-scroll">
    <div class="text-2xl">You're Scouting Team:</div>
    <div
        style={color === "blue"
            ? "color: #2196F3 !important"
            : "color: #F44336 !important"}
        class="text-6xl font-semibold"
    >
        {match_data.team_key}
    </div>
    <div class="text-xl">In {match_data.match_key.toUpperCase()}</div>
</div>
