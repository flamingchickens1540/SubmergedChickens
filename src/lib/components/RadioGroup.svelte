<script lang="ts">
    type Props = {
        labels: string[]
        value: string
    }

    let { labels, value = $bindable() }: Props = $props()
</script>

<div class="mt-0 text-center">
    {#each labels as label}
        <label
            class="m-2 ml-0 mt-auto block w-full rounded p-5 text-lg font-semibold {value ===
            label
                ? 'bg-xanthous'
                : 'bg-gunmetal'}"
        >
            <input
                type="radio"
                name="radio-group"
                value={label}
                bind:group={value}
                class="hidden"
            />
            <span>{label}</span>
        </label>
    {/each}
</div>
