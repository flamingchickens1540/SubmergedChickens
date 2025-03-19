import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"

export const load: PageServerLoad = async ({ params: _, url }) => {
    const scout = Number.parseInt(url.searchParams.get("scout") ?? "")
    const one_match = url.searchParams.get("match")
    const one = Number.parseInt(url.searchParams.get("team")!)

    const event_key = (await prisma.eventState.findFirst({}))?.event_key

    const team_matches = await prisma.teamMatch.findMany({
        where: {
            scoutId: {
                equals: scout,
            },
        },
    })

    if (team_matches.length === 0) return redirect(307, "/home")

    // Second to last since `one` was already submitted
    const last_team = team_matches[team_matches.length - 2]!

    const two = last_team.team_key
    const two_match = last_team.match_key

    // TODO Create endpoint
    const categories = await prisma.tag.findMany({})
    console.log(categories)

    return {
        event_key,
        categories,
        one_match,
        one,
        two_match,
        two,
    }
}
