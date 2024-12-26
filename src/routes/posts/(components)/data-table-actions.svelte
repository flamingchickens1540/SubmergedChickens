<script lang="ts">
  import * as HoverCard from "$lib/components/ui/hover-card/index.js";

  let { content }: { content: string } = $props();
</script>
 
<HoverCard.Root>
  <HoverCard.Trigger>
    { content.slice(0, 50) + "..." }
  </HoverCard.Trigger>
  <HoverCard.Content class="w-[400px] ml-[32px]">
    { content }
  </HoverCard.Content>
</HoverCard.Root>