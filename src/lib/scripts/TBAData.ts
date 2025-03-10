import { API_KEY } from "$env/static/private"
import { getEventKey } from "./dbUtil"

export async function updateTBAMatchData(match_key: string) {
    const event_key = await getEventKey()

    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/match/${event_key}_${match_key}`,
        {
            metod: "GET",
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
}
