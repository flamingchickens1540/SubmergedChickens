import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { getEventKey, setEventKey } from "@/scripts/dbUtil"
import { preload } from "@/scripts/preload"

export const GET: RequestHandler = async ({ request: _ }: any) => {
    return json(await getEventKey())
}

export const POST: RequestHandler = async ({ request }: any) => {
    const { event_key } = await request.json()

    const event_in_db = await preload(event_key)
    if (event_in_db) await setEventKey(event_key)

    return json({ status: 200 })
}
