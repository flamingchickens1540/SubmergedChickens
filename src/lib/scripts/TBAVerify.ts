import { error } from "@/consoleUtils"
import { getEventKey } from "./dbUtil"
import { API_KEY } from "$env/static/private"

export async function getTeamsInMatch(match_key: string): Promise<
    | {
          red: string[]
          blue: string[]
      }
    | undefined
> {
    const event_key = await getEventKey()
    if (!event_key) {
        error(
            `Can't get teams for match ${match_key} since current event isn't set`
        )
        return
    }

    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/match/${event_key}_${match_key}`,
        {
            method: "GET",
            headers: {
                "If-None-Match": "ETag",
                "Accept": "application/json",
                "X-TBA-Auth-Key": API_KEY,
            },
        }
    )
    if (!res.ok) {
        error(`TBA /match/${match_key} request failed: ${res.status}`)
        return
    }

    const match = await res.json()
    const alliances = match["alliances"]

    const red = (alliances["red"]["team_keys"] as string[]).map(key =>
        key.slice(3)
    )
    const blue = (alliances["blue"]["team_keys"] as string[]).map(key =>
        key.slice(3)
    )

    return {
        red,
        blue,
    }
}

// TODO Implement data verification with TBA API
import { TBA_AUTH_KEY } from "$env/static/private"

export async function verifyTeamMatch(
    team_key: number,
    match_key: string
): Promise<boolean> {
    const response = await (
        await fetch(
            `https://www.thebluealliance.com/api/v3/match/${match_key}/simple`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-TBA-Auth-Key": TBA_AUTH_KEY,
                },
            }
        )
    ).json()

    const team_keys: string[] = [
        ...response.alliances.blue.team_keys,
        ...response.alliances.red.team_keys,
    ].map(a => a.slice(3))

    return team_keys.includes(team_key.toString())
}
