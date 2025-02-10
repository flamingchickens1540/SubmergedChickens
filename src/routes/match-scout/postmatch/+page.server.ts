import type { PageServerLoad } from "./$types"

//TODO: pull this from the database
export const load: PageServerLoad = async ({ params }) => {
    return {
        tagcategories: [
            { category: "Roles", tags: ["defender", "algae", "coral"] },
            {
                category: "Matchplay",
                tags: ["heavily-defended", "gamepiece-stuck", "tipped-over"],
            },
            {
                category: "Damage",
                tags: ["lost-comms", "bumper-damage", "mech-fail"],
            },
        ],
    }
}
