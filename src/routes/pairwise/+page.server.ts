import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"

export const load: PageServerLoad = async ({ params: _, url }) => {
    const scout = Number.parseInt(url.searchParams.get("scout") ?? "")
    const one_match = url.searchParams.get("match")
    const one = url.searchParams.get("team")

    const last_team_res = prisma.teamMatch.findFirst({
        where: {
            scoutId: {
                equals: scout,
            },
        },
    })
    // const last_team_res = await fetch(`/api/pairwise/lastTeamMatch/${scout}`)
    if (!last_team_res.ok || last_team_res.status == 204) redirect(300, "/home")

    const last_team_body = await last_team_res.json()
    const two = last_team_body["team"]
    const two_match = last_team_body["match"]

    // TODO Create endpoint
    const category_res = await fetch(`/api/pairwise/categories/`)
    if (!category_res.ok || category_res.status == 204) redirect(300, "/home")
    console.log("here2")

    const category_body = await category_res.json()
    const categories = category_body["categories"]

    return {
        categories,
        one_match,
        one,
        two_match,
        two,
    }
}
