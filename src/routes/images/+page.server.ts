import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getEventKey } from "@/scripts/dbUtil"
import { prisma } from "@/prisma"
import type { Drivetrain } from "@prisma/client"

export const load: PageServerLoad = async ({ url }) => {
    const team_key_string = url.searchParams.get("team")
    if (!team_key_string) return error(400, "Bad Query Parameters")
    const team_key = parseInt(team_key_string)

    const event_key = await getEventKey()
    if (!event_key) return error(500, "No event key set.")

    const teamEvent = await prisma.teamEvent.findUnique({
        where: {
            team_key_event_key: {
                team_key: team_key,
                event_key: event_key,
            },
        },
        include: {
            image: true,
        },
    })

    if (!teamEvent) {
        return error(404, "Team event not found")
    }

    return { team_key, event_key, images: teamEvent.image }
}
