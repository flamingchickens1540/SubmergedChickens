<script lang="ts">
    type Props = {
        labels: string[]
        selected: string[]
    }

    let { labels, selected = $bindable([]) }: Props = $props()

    function toggleLabel(label: string) {
        if (selected.includes(label)) {
            selected = selected.filter(item => item !== label)
        } else {
            selected = [...selected, label]
        }
    }
</script>

<div class="mt-0">
    {#each labels as label}
        <button
            onclick={() => toggleLabel(label)}
            class="m-2 ml-0 mt-auto block w-full rounded bg-gunmetal p-5 text-lg font-semibold"
            class:bg-xanthous={selected.includes(label)}
        >
            <span>{label}</span>
        </button>
    {/each}
</div>
