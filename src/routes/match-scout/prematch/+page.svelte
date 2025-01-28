<script lang="ts">
    import { goto } from "$app/navigation"
    import Header from "../Header.svelte"
</script>

<div>
    <Header
        game_stage={"Prematch"}
        team_name={1540}
        next_page={() => goto("/match-scout/auto")}
    />
</div>
