import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { lastTeamMatch } from "@/scripts/dbUtil"

export const POST: RequestHandler = async ({ params, request }: any) => {
    const scout_id: number = params.scout
    return json(await lastTeamMatch(scout_id))
}
