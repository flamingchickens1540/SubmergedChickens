<script lang="ts">
    type Props = {
        labels: string[]
        selected: string[]
    }

    let { labels, selected = $bindable([]) }: Props = $props()
</script>

<div class="mt-0 text-center">
    {#each labels as label}
        <labeli
            class="m-2 ml-0 mt-auto block w-full rounded p-5 text-lg font-semibold {selected.includes(
                label
            )
                ? 'bg-xanthous'
                : 'bg-gunmetal'}"
        >
            <input
                type="checkbox"
                bind:group={selected}
                value={label}
                class="hidden"
            />
            <span>{label}</span>
        </labeli>
    {/each}
</div>
