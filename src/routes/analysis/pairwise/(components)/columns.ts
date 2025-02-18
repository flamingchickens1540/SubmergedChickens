import type { ColumnDef } from "@tanstack/table-core"
import { renderComponent } from "$lib/components/ui/data-table/index.js"
import DataTableScoreButton from "./data-table-score-button.svelte"
import type { Ranking } from "$lib/scripts/pairwise"

export type { Ranking }

export const columns: ColumnDef<Ranking<number>>[] = [
    {
        accessorKey: "rank",
        header: "Rank",
    },
    {
        accessorKey: "team",
        header: "Team",
    },
    {
        accessorKey: "score",
        header: ({ column }) =>
            renderComponent(DataTableScoreButton, {
                onclick: () =>
                    column.toggleSorting(column.getIsSorted() === "asc"),
            }),
    },
]
