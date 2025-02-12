import { submitPitscout } from "@/scripts/submit"
import type { TeamEvent, Image } from "@prisma/client"
import { json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request }: any) => {
    const {data, imgs} : {data: Omit<TeamEvent, "id">, imgs: Omit<Image, "id" | "team_event_id">[]}  = await request.json()
    return json(await submitPitscout(data, imgs))
}