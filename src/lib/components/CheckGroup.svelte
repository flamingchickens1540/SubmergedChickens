<script lang="ts">
    type Props = {
        labels: string[]
        selected: string[]
        title?: string
    }

    let { title, labels, selected = $bindable([]) }: Props = $props()
</script>

<div class="flex flex-col gap-2">
    {#if title}
        <span class="font-heading text-xl font-semibold">{title}</span>
    {/if}
    {#each labels as label}
        <label class="block w-full text-lg font-medium">
            <input
                type="checkbox"
                bind:group={selected}
                id={label}
                name={label}
                value={label}
            />
            <span>{label}</span>
        </label>
    {/each}
</div>
