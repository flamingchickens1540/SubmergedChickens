import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"

export const load: PageServerLoad = async ({ params: _, url }) => {
    const event_key = (await prisma.eventState.findFirst({}))?.event_key

    const scout = Number.parseInt(url.searchParams.get("scout") ?? "")
    // const one_match = event_key + "_" + url.searchParams.get("match")
    // const one = Number.parseInt(url.searchParams.get("team")!)

    const team_matches = await prisma.teamMatch.findMany({
        where: {
            scoutId: {
                equals: scout,
            },
            event_key: {
                equals: event_key,
            },
        },
    })

    if (team_matches.length < 2) return redirect(307, "/home")

    const curr_team_match = team_matches.pop()
    const last_team_match = team_matches.pop()

    const [one, one_match] = [
        curr_team_match?.team_key,
        curr_team_match?.match_key,
    ]
    const two_match = last_team_matchk

    const two = last_team.team_key
    const two_match = last_team.match_key

    const categories = ["algae", "coral", "defense"]

    return {
        categories,
        one_match,
        one,
        two_match,
        two,
    }
}
