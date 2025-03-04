import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { lastTeamMatch } from "@/scripts/dbUtil"

export const POST: RequestHandler = async ({ params, request }: any) => {
    const scout: string = params.scout
    return json(await lastTeamMatch(scout))
}
