import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { getTeamsInMatch } from "$lib/scripts/TBAVerify"

export const GET: RequestHandler = async ({ params }: any) => {
    const match_key = params.match_key
    return json(await getTeamsInMatch(match_key))
}
