import type { PageServerLoad } from "./$types"

// TODO: Teams and status from the database
export const load: PageServerLoad = async ({ params }) => {
    return {
        teams: Array.from({ length: 41 }, (_, i) => ({
            number: 1500 + i,
            data: Math.random() > 0.6,
            images: Math.random() > 0.6
        }))
    }
}
