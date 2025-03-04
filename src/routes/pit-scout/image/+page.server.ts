import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { getEventKey } from "@/scripts/dbUtil"
import { prisma } from "@/prisma"

export const load: PageLoad = async ({ params, url }) => {
    const team_key_string = url.searchParams.get("team")
    if (!team_key_string) return error(400, "Bad Query Parameters");
    const team_key = parseInt(team_key_string)
    
    const event_key = await getEventKey();
    if (!event_key) return console.error("No event key set.");

    
    const result = await prisma.teamEvent.findUnique({
        where: {
            team_key_event_key: {
                team_key: team_key,
                event_key: event_key
            }
        },
        select: {
            image: true
        }
    })

    if (!result) console.error("Result no gud")
    return result?.image.map((img) => (img.data))
}
