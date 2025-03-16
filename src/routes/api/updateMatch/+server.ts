import { json, type RequestHandler } from "@sveltejs/kit"
import { updateTBAMatchData } from "$lib/scripts/TBAUpdateTM"

export const POST: RequestHandler = async ({ request }: any) => {
    const match_key: string = await request.json()
    return json(await updateTBAMatchData(match_key))
}
