<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable/index.js"
    import AllianceInput from "./AllianceInput.svelte"

    import type { PageProps } from "./$types"

    let { data }: PageProps = $props()

    $effect(() => {
        console.log(data)
    })
</script>

<Resizable.PaneGroup direction="horizontal" class="flex min-h-dvh flex-col">
    <AllianceInput alliance={"Red"} tagcategories={data.tagcategories} />
    <Resizable.Handle />
    <AllianceInput alliance={"Blue"} tagcategories={data.tagcategories} />
</Resizable.PaneGroup>
