<script lang="ts">
    import type { PageProps } from "./$types"

    let { data }: PageProps = $props()
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <span class="ml-auto text-center">Team List</span>
</header>

<div class="flex flex-col gap-1 p-2">
    {#each data.images as image}
        <!-- svelte-ignore a11y_missing_attribute -->
        <img src={`data:image/jpeg;base64,${image.data}`} class="mb-2" />
    {/each}
</div>