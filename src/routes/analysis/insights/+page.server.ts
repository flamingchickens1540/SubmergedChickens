import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"
import { warn } from "@/consoleUtils"

type TeamEventProcessed = {
    team_matches: TeamMatchProcessed[]
    average_coral: number
    average_algae: number
}

type TeamMatchProcessed = {
    coral_scored: number
    coral_ratio: number
    algae_scored: number
    algae_ratio: number
}

export const load: PageServerLoad = async ({}) => {
    const teams = await get_teams()
    const processed_team_events = process_data(teams)

    return { teams, processed_team_events }
}

async function process_data(teams: number[]): Promise<TeamEventProcessed[]> {
    return Promise.all(
        teams.map(async team_key => {
            const team_matches = await prisma.teamMatch.findMany({
                where: {
                    team_key: {
                        equals: team_key,
                    },
                },
            })

            const processed_team_matches = team_matches.map(team_match => {
                const coral_scored =
                    team_match.auto_score_l1_succeed! +
                    team_match.auto_score_l2_succeed! +
                    team_match.auto_score_l3_succeed! +
                    team_match.auto_score_l4_succeed! +
                    team_match.tele_score_l1_succeed! +
                    team_match.tele_score_l2_succeed! +
                    team_match.tele_score_l3_succeed! +
                    team_match.tele_score_l4_succeed!
                const coral_failed =
                    team_match.auto_score_l1_fail! +
                    team_match.auto_score_l2_fail! +
                    team_match.auto_score_l3_fail! +
                    team_match.auto_score_l4_fail! +
                    team_match.tele_score_l1_fail! +
                    team_match.tele_score_l2_fail! +
                    team_match.tele_score_l3_fail! +
                    team_match.tele_score_l4_fail!
                const coral_ratio = coral_scored / coral_failed

                const algae_scored =
                    team_match.auto_score_processor_succeed! +
                    team_match.tele_score_processor_succeed!
                const algae_failed =
                    team_match.auto_score_processor_fail! +
                    team_match.tele_score_processor_fail!
                const algae_ratio = algae_scored / algae_failed

                return {
                    coral_scored,
                    coral_ratio,
                    algae_scored,
                    algae_ratio,
                }
            })
            const number_of_matches = processed_team_matches.length + 1
            const average_coral =
                processed_team_matches.reduce(
                    (acc, match) => acc + match.coral_scored,
                    0
                ) / number_of_matches

            const average_algae =
                processed_team_matches.reduce(
                    (acc, match) => acc + match.algae_scored,
                    0
                ) / number_of_matches

            return {
                team_matches: processed_team_matches,
                average_coral,
                average_algae,
            }
        })
    )
}

async function get_teams(): Promise<number[]> {
    const event_key = (await prisma.eventState.findFirst({}))?.event_key
    if (!event_key) {
        warn(`Event: ${event_key} not found`)
        return []
    }

    const team_events = (
        await prisma.event.findFirst({
            where: {
                event_key: {
                    equals: event_key,
                },
            },
            select: {
                team_events: true,
            },
        })
    )?.team_events

    if (!team_events) {
        warn(`TeamEvents not found in event: ${event_key}`)
        return []
    }

    return team_events.map(team_event => team_event.team_key)
}
