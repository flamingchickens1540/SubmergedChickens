import { prisma } from "$lib/prisma"
import { API_KEY } from "$env/static/private"

type Match = {
    match_key: string
    teams: string[]
}

// WARNING For some reason prisma doesn't allow object fields to be initialized
// TeleActions: [] as TeleActionData[],
// AutoActions: [] as AutoActionData[],
export async function preload(event_key: string) {
    const match_keys = await getMatchesInEvent(event_key)
    if (!match_keys) return

    const matches = await matchKeysToMatches(match_keys)

    const placeholder_team_matches = matches.flatMap(({ match_key, teams }) =>
        teams.map(team_key => {
            return {
                match_key,
                team_key: parseTBATeam(team_key),
                event_key,
            }
        })
    )

    // NOTE Using Set to filter out duplicates
    const team_events = [...new Set(matches.flatMap(match => match.teams))].map(
        team_key => {
            return {
                team_key: parseTBATeam(team_key),
            }
        }
    )

    const teams = team_events.map(team_event => {
        return { key: team_event.team_key, name: "" }
    })

    await prisma.team.createMany({
        data: teams,
        skipDuplicates: true,
    })

    await prisma.event.create({
        data: {
            event_key,
            team_events: {
                createMany: {
                    data: team_events,
                },
            },
        },
    })

    await prisma.teamMatch.createMany({
        data: placeholder_team_matches,
    })
}

async function matchKeysToMatches(match_keys: string[]): Promise<Match[]> {
    const team_matches = (
        await Promise.all(
            match_keys.map(async match_key => {
                return {
                    match_key,
                    teams: await getTeamsInMatch(match_key),
                }
            })
        )
    ).filter(({ match_key: _, teams }) => teams !== undefined) as Match[]

    return team_matches
}

function parseTBATeam(team_key: string): number {
    return Number.parseInt(team_key.slice(3))
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
async function getTeamsInMatch(match_key: string): Promise<string[]> {
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
        console.error(
            `Failed get teams in match ${match_key}\n\tError ${response.status}`
        )
        return []
    }

    const alliances = (await response.json())["alliances"]
    const red = alliances["red"]["team_keys"]
    const blue = alliances["blue"]["team_keys"]

    return [...red, ...blue]
}
