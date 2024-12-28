import type { ColumnDef } from "@tanstack/table-core"
import { renderComponent } from "$lib/components/ui/data-table/index.js"
import DataTableActions from "./data-table-actions.svelte"
import DataTableAuthorButton from "./data-table-author-button.svelte"
import type { Post } from "@prisma/client"

export type { Post }

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "id",
        header: "Post ID",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
            return renderComponent(DataTableActions, {
                content: row.original.content,
            })
        },
    },
    {
        accessorKey: "authorId",
        header: ({ column }) =>
            renderComponent(DataTableAuthorButton, {
                onclick: () =>
                    column.toggleSorting(column.getIsSorted() === "asc"),
            }),
    },
]
