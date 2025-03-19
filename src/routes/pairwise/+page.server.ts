import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"

export const load: PageServerLoad = async ({ params: _, url }) => {
    const scout = Number.parseInt(url.searchParams.get("scout") ?? "")
    const categories = ["algae", "coral", "defense"]

    const event_key = (await prisma.eventState.findFirst({}))?.event_key
    if (event_key === undefined) return redirect(307, "/home")

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

    // We have to sort by number, not by string, otherwise qm20 and qm2 will be next to each other
    // WARNING This only yields the last two teams if last two match keys are different (Autumn)
    // Otherwise, it will just grab an arbitrary team from the current match
    const sorted = team_matches
        .map(team_match => [team_match.team_key, team_match.match_key])
        .sort(
            (b, a) =>
                matchKeyToNum(b[1] as string) - matchKeyToNum(a[1] as string)
        )
    console.log(sorted)

    const [one, one_match] = sorted.pop()!
    const [two, two_match] = sorted.pop()!

    return {
        event_key,
        categories,
        one_match,
        one,
        two_match,
        two,
    }
}

function matchKeyToNum(match_key: string): number {
    return Number.parseInt(match_key.split("_")[1].split("m")[1])
}
