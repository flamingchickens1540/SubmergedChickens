<script lang="ts">
    import type { SubmittedTeamMatch } from "@/types"

    let {
        submitted_team_matches = $bindable(),
    }: { submitted_team_matches: SubmittedTeamMatch[] } = $props()

    const can_clear_pm = $derived(
        submitted_team_matches.length === 0
            ? "pointer-events-none opacity-30"
            : ""
    )
</script>

<div class="row-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
    <span class="col-span-2 text-center">Team Matches</span>

    <div class="grid max-h-64 grid-cols-1 gap-2 overflow-y-scroll">
        {#each submitted_team_matches as team_match, i}
            <button
                class="grid h-10 grid-cols-1 place-items-center rounded bg-eerie_black p-1 text-center"
                onclick={() =>
                    (submitted_team_matches[i].displaying_tk =
                        !team_match.displaying_tk)}
            >
                {#if team_match.displaying_tk || team_match.scout_username === ""}
                    {team_match.match_key} {team_match.team_key}
                {:else}
                    {team_match.scout_username}
                {/if}
            </button>
        {/each}
    </div>
    <button
        class="mt-auto rounded bg-eerie_black {can_clear_pm}"
        onclick={() => (submitted_team_matches = [])}>Clear</button
    >
</div>
