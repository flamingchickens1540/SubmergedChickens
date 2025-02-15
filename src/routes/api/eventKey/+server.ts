import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { getEventKey, setEventKey } from "@/scripts/dbUtil"

export const GET: RequestHandler = async ({ request: _ }: any) => {
    return json(await getEventKey())
}

export const PUT: RequestHandler = async ({ request }: any) => {
    const { event_key } = await request.json()
    return json(await setEventKey(event_key))
}
