import { getEventKey } from "@/scripts/dbUtil"
import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"

// TODO: Teams and status from the database
export const load: PageServerLoad = async ({ params }) => {
    let event_key = await getEventKey();

    if (event_key == undefined) console.error("No event key set.");
    event_key = event_key as string;

    const teams = await prisma.teamEvent.findMany({
        where: {
            event_key: event_key
        },
        select: {
            team_key: true,
            dataCollected: true,
            imageCollected: true
        }
    });

    return {
        teams: teams.map(({team_key, dataCollected, imageCollected}) => ({
            number: team_key,
            data: dataCollected,
            images: imageCollected
        }))
    }
}
