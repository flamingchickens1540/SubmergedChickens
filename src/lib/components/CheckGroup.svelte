<script lang="ts">
    type Props = {
        labels: { name: string; category: string }[]
        selected: string[]
    }

    let { labels, selected = $bindable([]) }: Props = $props()
    let categories: Map<string, string[]> = new Map()
    labels.map(({ name, category }) =>
        categories.set(category, [...(categories.get(category) ?? []), name])
    )
</script>

<div class="mt-0 text-center">
    {#each categories.entries() as [category, tags]}
        <div class="text-center text-xl font-bold">
            {category.toUpperCase()}
        </div>
        {#each tags as tag}
            <label
                class="m-2 ml-0 mt-auto block w-full rounded p-5 text-lg font-semibold {selected.includes(
                    tag + ' (' + category + ')'
                )
                    ? 'bg-xanthous'
                    : 'bg-gunmetal'}"
            >
                <input
                    type="checkbox"
                    bind:group={selected}
                    value={tag + " (" + category + ")"}
                    class="hidden"
                />
                <span>{tag}</span>
            </label>
        {/each}
    {/each}
</div>
