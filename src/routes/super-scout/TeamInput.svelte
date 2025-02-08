<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable/index.js"
    import CheckGroup from "@/components/CheckGroup.svelte"
    import { ScrollArea } from "@/components/ui/scroll-area/index.js"

    let { tagcategories }: { tagcategories: any } = $props()
</script>

<Resizable.Pane defaultSize={50}>
    <Resizable.PaneGroup direction="vertical" class="flex h-full flex-col">
        {#each ["One", "Two", "Three"] as team}
            <Resizable.Pane defaultSize={33}>
                <Resizable.PaneGroup
                    direction="horizontal"
                    class="flex h-full flex-col"
                >
                    <Resizable.Pane defaultSize={66}>
                        <div class="flex h-full flex-col justify-center">
                            <ScrollArea orientation="horizontal" class="">
                                <div class="flex flex-row gap-2">
                                    {#each tagcategories as tagcategory}
                                        <CheckGroup
                                            labels={tagcategory.tags}
                                            selected={[]}
                                        ></CheckGroup>
                                    {/each}
                                </div>
                            </ScrollArea>
                        </div>
                    </Resizable.Pane>
                    <Resizable.Handle />
                    <Resizable.Pane defaultSize={33}>
                        <div class="flex h-full flex-col justify-center">
                            <div class="flex justify-center">
                                <span class="text-xl font-semibold">{team}</span
                                >
                            </div>
                            <textarea
                                class="border-red w-full flex-grow rounded bg-gunmetal p-2"
                                placeholder="notes..."
                            ></textarea>
                        </div>
                    </Resizable.Pane>
                </Resizable.PaneGroup>
            </Resizable.Pane>
            <Resizable.Handle />
        {/each}
    </Resizable.PaneGroup>
</Resizable.Pane>

<!-- 
TODO: IMPLEMENT TAGS

-->
