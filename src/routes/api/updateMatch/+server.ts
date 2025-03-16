import { json, type RequestHandler } from "@sveltejs/kit"
import { TBAUpdateMatchData } from "$lib/scripts/TBAUpdateTM"

export const PATCH: RequestHandler = async ({ request }: any) => {
    const match_key: string = await request.json()
    return json(await TBAUpdateMatchData(match_key))
}
