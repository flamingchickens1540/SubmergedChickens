import { prisma } from "@/prisma"
import type { TeamMatch } from "@prisma/client"

export async function lastTeamMatch(scout: string): Promise<TeamMatch> {
    const team_matches = await prisma.teamMatch.findMany({
        where: {
            scout: {
                username: {
                    equals: scout,
                },
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

async function newEvent(event_key: string, team_keys: string[]) {
    await prisma.event.create({
        data: {
            event_key,
            team_events: {
                create: team_keys.map(key => {
                    return {
                        team_key: key,
                        team: { create: [{ key: key, name: "" }] },
                    }
                }),
            },
            event_state: {
                create: [
                    {
                        next_match_key: 1,
                        stream_url: "",
                    },
                ],
            },
        },
        include: {
            event_state: true,
        },
    })
}
