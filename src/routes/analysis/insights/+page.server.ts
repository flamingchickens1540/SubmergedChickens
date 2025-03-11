import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getEventKey } from "@/scripts/dbUtil"
import { prisma } from "@/prisma"

export const load: PageServerLoad = async ({}) => {
    const event_key = (await prisma.eventState.findFirst({}))?.event_key
    if (!event_key) return { teams: [] }
    const teams = await prisma.event.findFirst({
        where: {
            event_key: {
                equals: event_key,
            },
        },
    })
    if (!teams) {
        return error(404, `Teams not found in event: ${event_key}`)
    }

    return { teams }
}
