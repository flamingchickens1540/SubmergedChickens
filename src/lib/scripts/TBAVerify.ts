import { error } from "@/consoleUtils"
import { getEventKey } from "./dbUtil"
import { API_KEY } from "$env/static/private"

// TOOD: implement data verification with TBA API
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
            `Can't get get teams for match ${match_key} being current event isn't set`
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
