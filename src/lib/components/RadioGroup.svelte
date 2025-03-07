<script lang="ts">
    type Props = {
        labels: string[]
        value: string
        title?: string
    }

    let { title, labels, value = $bindable() }: Props = $props()
</script>

<div class="flex flex-col gap-2">
    {#if title}
        <span class="font-heading text-xl font-semibold">{title}</span>
    {/if}
    {#each labels as label}
        <label class="block w-full text-lg font-medium">
            <input
                type="radio"
                name="radio-group"
                value={label}
                bind:group={value}
            />
            <span>{label}</span>
        </label>
    {/each}
</div>
