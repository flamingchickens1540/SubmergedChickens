<script lang="ts" generics="TData, TValue">
    import {
        type ColumnDef,
        type PaginationState,
        type SortingState,
        type ColumnFiltersState,
        type VisibilityState,
        getCoreRowModel,
        getPaginationRowModel,
        getSortedRowModel,
        getFilteredRowModel,
    } from "@tanstack/table-core"
    import {
        createSvelteTable,
        FlexRender,
    } from "$lib/components/ui/data-table/index.js"
    import * as Table from "$lib/components/ui/table/index.js"
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js"
    import { Button } from "$lib/components/ui/button/index.js"
    import { Input } from "$lib/components/ui/input/index.js"
    import Settings2 from "lucide-svelte/icons/settings-2"

    type DataTableProps<TData, TValue> = {
        columns: ColumnDef<TData, TValue>[]
        stability: number
        data: TData[]
    }

    let { data, stability, columns }: DataTableProps<TData, TValue> = $props()

    let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 })
    let sorting = $state<SortingState>([])
    let columnFilters = $state<ColumnFiltersState>([])
    let columnVisibility = $state<VisibilityState>({})

    const table = createSvelteTable({
        get data() {
            return data
        },
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: updater => {
            if (typeof updater === "function") {
                pagination = updater(pagination)
            } else {
                pagination = updater
            }
        },
        onSortingChange: updater => {
            if (typeof updater === "function") {
                sorting = updater(sorting)
            } else {
                sorting = updater
            }
        },
        onColumnFiltersChange: updater => {
            if (typeof updater === "function") {
                columnFilters = updater(columnFilters)
            } else {
                columnFilters = updater
            }
        },
        onColumnVisibilityChange: updater => {
            if (typeof updater === "function") {
                columnVisibility = updater(columnVisibility)
            } else {
                columnVisibility = updater
            }
        },
        state: {
            get pagination() {
                return pagination
            },
            get sorting() {
                return sorting
            },
            get columnFilters() {
                return columnFilters
            },
            get columnVisibility() {
                return columnVisibility
            },
        },
    })
</script>

<div>
    <div class="flex items-center py-4">
        <Input
            placeholder="Filter posts..."
            value={table.getColumn("team")?.getFilterValue() as string}
            onchange={e =>
                table.getColumn("team")?.setFilterValue(e.currentTarget.value)}
            oninput={e =>
                table.getColumn("team")?.setFilterValue(e.currentTarget.value)}
            class="max-w-sm"
        />
        <span class="pl-4">{`Stability: ${stability.toFixed(2)}`}</span>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <Button {...props} variant="outline" class="ml-auto"
                        ><Settings2 />View</Button
                    >
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                {#each table
                    .getAllColumns()
                    .filter(col => col.getCanHide()) as column (column.id)}
                    <DropdownMenu.CheckboxItem
                        class="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={value =>
                            column.toggleVisibility(!!value)}
                    >
                        {column.id}
                    </DropdownMenu.CheckboxItem>
                {/each}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
    <div class="rounded-md border">
        <Table.Root>
            <Table.Header>
                {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                    <Table.Row>
                        {#each headerGroup.headers as header (header.id)}
                            <Table.Head>
                                {#if !header.isPlaceholder}
                                    <FlexRender
                                        content={header.column.columnDef.header}
                                        context={header.getContext()}
                                    />
                                {/if}
                            </Table.Head>
                        {/each}
                    </Table.Row>
                {/each}
            </Table.Header>
            <Table.Body>
                {#each table.getRowModel().rows as row (row.id)}
                    <Table.Row data-state={row.getIsSelected() && "selected"}>
                        {#each row.getVisibleCells() as cell (cell.id)}
                            <Table.Cell>
                                <FlexRender
                                    content={cell.column.columnDef.cell}
                                    context={cell.getContext()}
                                />
                            </Table.Cell>
                        {/each}
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Cell
                            colspan={columns.length}
                            class="h-24 text-center"
                        >
                            No results.
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
    <div class="flex items-center justify-end space-x-2 py-4">
        <Button
            variant="outline"
            size="sm"
            onclick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            Previous
        </Button>
        <Button
            variant="outline"
            size="sm"
            onclick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            Next
        </Button>
    </div>
</div>
