import { error } from "@/consoleUtils"
import { prisma } from "@/prisma"
import type { TeamMatch } from "@prisma/client"

export async function lastTeamMatch(scout_id: number): Promise<TeamMatch> {
    const team_matches = await prisma.teamMatch.findMany({
        where: {
            scoutId: {
                equals: scout_id,
            },
        },
    })

    const match_key_to_number = (key: string): number =>
        Number.parseInt(key.split("_").pop()!.split("m")[1])

    team_matches.sort(
        (a, b) =>
            match_key_to_number(a.match_key) - match_key_to_number(b.match_key)
    )
    console.log(team_matches.map(a => a.match_key))

    return team_matches[0]
}

export async function getEventKey(): Promise<string | undefined> {
    const event_state = await prisma.eventState.findFirst({})
    return event_state?.event_key
}

export async function setEventKey(event_key: string): Promise<boolean> {
    const updated = await prisma.eventState.updateMany({
        where: {
            id: {
                not: -1,
            },
        },
        data: {
            event_key,
        },
    })
    if (updated.count === 1) return true

    error(`EventState broken, updated count: ${updated.count}`)
    return false
}
