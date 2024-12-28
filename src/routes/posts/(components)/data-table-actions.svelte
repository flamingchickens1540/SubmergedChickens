<script lang="ts">
    import * as HoverCard from "$lib/components/ui/hover-card/index.js"

    let { content }: { content: string } = $props()
</script>

<HoverCard.Root>
    <HoverCard.Trigger>
        {content.slice(0, 50) + "..."}
    </HoverCard.Trigger>
    <HoverCard.Content class="ml-[32px] w-[400px]">
        {content}
    </HoverCard.Content>
</HoverCard.Root>
