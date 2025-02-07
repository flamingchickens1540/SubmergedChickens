<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable/index.js"
    import AllianceInput from "./AllianceInput.svelte"
    import Sorting from "./Sorting.svelte"
</script>

<Resizable.PaneGroup direction="horizontal" class="flex min-h-dvh flex-col">
    <AllianceInput alliance={"Red"} />
    <Resizable.Handle />
    <AllianceInput alliance={"Blue"} />
</Resizable.PaneGroup>
