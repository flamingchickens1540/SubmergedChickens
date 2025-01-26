<script lang="ts">
    import type { TelePageState, AutoPageState, AutoAction } from "$lib/types"

    let {
        team_name,
        game_stage,
        page_state = $bindable(),
    }: {
        team_name: String
        game_stage: String
        page_state: AutoPageState
    } = $props()

    $effect(() => console.log(page_state))
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 font-semibold"
>
    <span class="">
        {team_name}
    </span>
    <!-- TODO: Undo button -->
    <span>{page_state == "None" ? game_stage : page_state}</span>
</header>
