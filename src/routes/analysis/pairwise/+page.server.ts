import type { PageServerLoad } from "./$types"
import { prisma } from "$lib/prisma"
import { analyze_comparisons, type Comparison } from "@/scripts/pairwise"
import { redirect } from "@sveltejs/kit"

export const load = (async () => {
    const event_key = (await prisma.eventState.findFirst({}))?.event_key
    if (!event_key) return redirect(307, "/analysis/blank")

    const data: Comparison<number>[] = (
        await prisma.comparison.findMany({
            where: {
                event_key: {
                    equals: event_key,
                },
            },
        })
    ).map(set => {
        return {
            teamA: set.team_A_team_key,
            teamB: set.team_B_team_key,
            diff: -set.diff,
        }
    })

    return {
        comparisons: analyze_comparisons(data),
    }
}) satisfies PageServerLoad
