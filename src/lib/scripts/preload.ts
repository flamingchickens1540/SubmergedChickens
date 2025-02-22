import { prisma } from "$lib/prisma"
import { API_KEY } from "$env/static/private"

export async function preload(event_key: string) {
    const match_keys = await getMatchesInEvent(event_key)
    if (!match_keys) return

    const team_matches = (
        await Promise.all(
            match_keys.map(async match_key => {
                return {
                    match_key,
                    alliances: await getTeamMatch(match_key),
                }
            })
        )
    ).filter(({ match_key: _, alliances }) => alliances !== undefined)

    const placeholder_team_matches = team_matches.flatMap(
        ({ match_key, alliances }) =>
            [...alliances!.red, ...alliances!.blue].map(team_key => {
                console.log(team_key.slice(3))
                return {
                    match_key,
                    team_key: Number.parseInt(team_key.slice(3)),
                    event_key,
                    // WARNING For some reason it doesn't allow object fields
                    // TeleActions: [] as TeleActionData[],
                    // AutoActions: [] as AutoActionData[],
                }
            })
    )

    // Filter out duplicates
    const team_events = new Set(
        team_matches.flatMap(team_match => [
            ...team_match.alliances!.red,
            ...team_match.alliances!.blue,
        ])
    ).map()

    await prisma.event.create({
        data: {
            event_key,
            team_events: {
                createMany: k,
            },
        },
    })

    await prisma

    await prisma.teamMatch.createMany({
        data: placeholder_team_matches,
    })
}

async function getMatchesInEvent(
    event_key: string
): Promise<string[] | undefined> {
    const url = `https://www.thebluealliance.com/api/v3/event/${event_key}/matches/keys`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "If-None-Match": "ETag",
            "X-TBA-Auth-Key": API_KEY,
        },
    })

    if (!response.ok) {
        console.error(`Failed getMatchesInEvent: ${response.status}`)
        return
    }
    const matches: string[] = await response.json()
    return matches
}

///  @param: event_key - `2024orbb`
/// @param: match_key - `qm1`
///
/// Querie Endpoint: https://www.thebluealliance.com/apidocs/v3
async function getTeamMatch(
    match_key: string
): Promise<{ red: string[]; blue: string[] } | undefined> {
    const url = `https://www.thebluealliance.com/api/v3/match/${match_key}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "If-None-Match": "ETag",
            "X-TBA-Auth-Key": API_KEY,
        },
    })

    if (!response.ok) {
        console.error(`Failed getTeamMatch: ${response.status}`)
        return
    }

    const alliances = (await response.json())["alliances"]

    const red = alliances["red"]["team_keys"]
    const blue = alliances["blue"]["team_keys"]

    return { red, blue }
}
