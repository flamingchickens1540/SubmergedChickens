<script lang="ts">
    type Props = {
        labels: string[]
        value: string
    }

    let { labels, value = $bindable() }: Props = $props()
</script>

<div class="mt-0">
    {#each labels as label}
        <button
            onclick={() => (value = label)}
            class="m-2 ml-0 mt-auto block w-full rounded bg-gunmetal p-5 text-lg font-semibold"
            class:bg-xanthous={value === label}
        >
            {label}
        </button>
    {/each}
</div>
