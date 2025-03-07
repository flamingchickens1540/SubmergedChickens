import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getEventKey } from "@/scripts/dbUtil"
import { prisma } from "@/prisma"
import type { Drivetrain } from "@prisma/client"

// TODO: Pull information about the event from the database
export const load: PageServerLoad = async ({ url }) => {
    const team_key_string = url.searchParams.get("team")
    if (!team_key_string) return error(400, "Bad Query Parameters")
    const team_key = parseInt(team_key_string)

    const event_key = await getEventKey()
    if (!event_key) return console.error("No event key set.")

    const result = await prisma.teamEvent.findUnique({
        where: {
            team_key_event_key: {
                team_key: team_key,
                event_key: event_key,
            },
        },
        omit: {
            id: true,
            imageCollected: true,
        },
    })

    if (!result) console.error("Result no gud")

    if (!result?.dataCollected) return { team_key, event_key }
    return result
}

