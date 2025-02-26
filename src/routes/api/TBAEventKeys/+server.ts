import { API_KEY } from "$env/static/private"
import { error } from "@/consoleUtils"
import { json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ request: _ }: any) => {
    const year = "2022"
    const event_res = await fetch(
        `https://www.thebluealliance.com/api/v3/events/${year}`,
        {
            method: "GET",
            headers: {
                "accept": "application/json",
                "If-None-Match": "ETag",
                "X-TBA-Auth-Key": API_KEY,
            },
        }
    )

    if (!event_res.ok) {
        error(`Failed to get ${year} event_keys from TBA`)
        return json([])
    }

    const events = (await event_res.json()) as any[]

    const event_keys = events.map(event => year + event["event_code"])
    return json(event_keys)
}
