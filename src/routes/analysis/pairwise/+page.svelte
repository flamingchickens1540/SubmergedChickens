<script lang="ts">
    import DataTable from "./(components)/data-table.svelte"
    import { columns } from "./(components)/columns.js"

    let { data } = $props()
</script>

<DataTable data={data.comparisons.rankings} stability={data.comparisons.stability} {columns} />