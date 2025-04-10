import { prisma } from "$lib/prisma"
import { API_KEY } from "$env/static/private"
import { info, warn, error } from "@/consoleUtils"

export async function preload(event_key: string): Promise<boolean> {
    const url = `https://www.thebluealliance.com/api/v3/event/${event_key}/`
    const event = await prisma.event.findUnique({
        where: {
            event_key,
        },
    })
    if (event !== null) {
        warn(`Event ${event_key} already in database`)
    }

    const teams_response = await fetch(url + "teams/simple", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "If-None-Match": "ETag",
            "X-TBA-Auth-Key": API_KEY,
        },
    })
    if (!teams_response.ok) {
        error(
            `Failed to get teams in ${event_key}, aborting preload: ${teams_response.status}`
        )
        return false
    }
    const tba_teams: { key: string; nickname: string }[] =
        await teams_response.json()
    const teams = tba_teams.map(({ key, nickname }) => {
        return { key: parseInt(key.slice(3)), name: nickname }
    })

    if (!tba_teams) {
        warn(`Teams not yet released for event ${event_key} (aborting preload)`)
        return false
    }

    await prisma.team.createMany({
        data: teams,
        skipDuplicates: true,
    })
    await prisma.event.upsert({
        where: {
            event_key,
        },
        create: {
            event_key,
            team_events: {
                createMany: {
                    data: teams.map(({ key, name }) => {
                        return { team_key: key }
                    }),
                },
            },
        },
        update: {
            team_events: {
                createMany: {
                    data: teams.map(({ key, name }) => {
                        return { team_key: key }
                    }),
                    skipDuplicates: true,
                },
            },
        },
    })

    const matches_response = await fetch(url + "matches/simple", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "If-None-Match": "ETag",
            "X-TBA-Auth-Key": API_KEY,
        },
    })
    if (!matches_response.ok) {
        error(
            `Failed to get matches in event ${event_key}: ${matches_response.status}`
        )
        return false
    }

    const tba_matches: {
        event_key: string
        key: string
        alliances: {
            red: { team_keys: string[] }
            blue: { team_keys: string[] }
        }
    }[] = await matches_response.json()
    const matches = tba_matches.flatMap(({ event_key, key, alliances }) => {
        return alliances.red.team_keys
            .map((team: string) => {
                return {
                    team_key: parseInt(team.slice(3)),
                    match_key: key,
                    event_key,
                }
            })
            .concat(
                alliances.blue.team_keys.map((team: string) => {
                    return {
                        team_key: parseInt(team.slice(3)),
                        match_key: key,
                        event_key,
                    }
                })
            )
    })

    const db_matches = await prisma.teamMatch.findMany({ where: { event_key } })
    if (db_matches.length > 0) {
        warn(`Matches already loaded into database for event ${event_key}`)
        return true
    }
    await prisma.teamMatch.createMany({ data: matches })

    info(
        `Event ${event_key} loaded into database along with ${matches.length} team_matches`
    )
    return true
}
