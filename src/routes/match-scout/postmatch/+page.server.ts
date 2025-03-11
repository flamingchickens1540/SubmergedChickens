import type { PageServerLoad } from "./$types"
import { prisma } from "$lib/prisma"

// TODO: Pull tags from the database
export const load: PageServerLoad = async ({ params }) => {
    return {
        tagcategories: await prisma.tag.findMany({
            select: {
                name: true,
                category: true,
            },
        }),
    }
}
