<script lang="ts">
    type Props = {
        labels: string[]
        value: string
    }

    let { labels, value = $bindable() }: Props = $props()
</script>

<div class="mt-0">
    {#each labels as label}
        <label
            class="m-2 ml-0 mt-auto block w-full rounded bg-gunmetal p-5 text-lg font-semibold"
        >
            <input
                type="radio"
                name="radio-group"
                value={label}
                bind:group={value}
                class:bg-xanthous={value === label}
            />
            {label}
        </label>
    {/each}
</div>
