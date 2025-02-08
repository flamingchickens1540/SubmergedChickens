<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable/index.js"
    import TeamInput from "./TeamInput.svelte"
    import Sorting from "./Sorting.svelte"

    let { alliance, tagcategories }: { alliance: string; tagcategories: any } =
        $props()
</script>

<Resizable.Pane defaultSize={50}>
    <Resizable.PaneGroup direction="vertical" class="flex min-h-dvh flex-col">
        <Resizable.Pane defaultSize={20}>
            <div class="h-full text-center text-4xl font-bold">
                <span>{alliance} Alliance</span>
                <Sorting {alliance} />
            </div>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={80}>
            <div class="flex h-full">
                <TeamInput {tagcategories} />
            </div>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</Resizable.Pane>
