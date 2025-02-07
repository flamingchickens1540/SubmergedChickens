<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable/index.js"
</script>

<Resizable.Pane defaultSize={50}>
    <Resizable.PaneGroup direction="vertical" class="flex h-full flex-col">
        <Resizable.Pane defaultSize={33}>
            <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">One</span>
            </div>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={33}>
            <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
            </div>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={33}>
            <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
            </div>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</Resizable.Pane>
