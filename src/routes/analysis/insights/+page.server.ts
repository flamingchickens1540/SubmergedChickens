import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"
import { warn } from "@/consoleUtils"
import { redirect } from "@sveltejs/kit"
import { API_KEY } from "$env/static/private"

export type GraphData = {
    match_numbers: number[]
    coral_scored: number[]
    coral_ratio: number[]
    algae_scored: number[]
    algae_ratio: number[]
}

type TeamEventProcessed = {
    key: number
    graph_data: GraphData
    average_coral?: number
    average_algae?: number
    rank?: number
    record?: string
    rp?: number
}

export const load: PageServerLoad = async ({}) => {
    const teams = await get_teams()
    const processed_team_events = (await process_data(teams)).filter(
        n => n !== undefined
    )

    if (processed_team_events.length === 0) {
        return redirect(307, "/analysis/insights/blank")
    }

    return { teams, processed_team_events }
}

async function process_data(teams: number[]): Promise<TeamEventProcessed[]> {
    const event_state = await prisma.eventState.findMany({})
    if (event_state.length !== 1) return []
    const event_key = event_state[0].event_key

    return Promise.all(
        teams.map(async team_key => {
            const { graph_data, average_coral, average_algae } =
                await get_team_data(team_key)

            const team_status = await get_team_status(team_key, event_key)
            if (team_status === undefined) {
                return {
                    key: team_key,
                    graph_data,
                    average_coral,
                    average_algae,
                }
            }
            const { rank, record, rp } = team_status

            return {
                key: team_key,
                graph_data,
                average_coral,
                average_algae,
                rank,
                record,
                rp,
            }
        }) as Promise<TeamEventProcessed>[]
    )
}

async function get_team_status(team_key: number, event_key: string) {
    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/team/frc${team_key}/event/${event_key}/status`,
        {
            method: "GET",
            headers: {
                "accept": "application/json",
                "If-None-Match": "ETag",
                "X-TBA-Auth-Key": API_KEY,
            },
        }
    )
    if (res.ok !== true) {
        warn(`TBA Status not found for team ${team_key} in event ${event_key}`)
        return undefined
    }

    const json = await res.json()

    const ranking: any = json["qual"]["ranking"]
    const rank: number = ranking["rank"]
    const [losses, _ties, wins] = Object.values(ranking["record"])
    const record: string = `${wins}:${losses}`
    const rp = ranking["sort_orders"][0]

    return {
        rank,
        record,
        rp,
    }
}

async function get_team_data(team_key: number) {
    const team_matches = await prisma.teamMatch.findMany({
        where: {
            team_key: {
                equals: team_key,
            },
        },
    })

    const graph_data = {
        match_numbers: [] as number[],
        coral_scored: [] as number[],
        coral_ratio: [] as number[],
        algae_scored: [] as number[],
        algae_ratio: [] as number[],
    }

    team_matches.forEach(team_match => {
        // NOTE For both algae and coral, we only want to count the matches that haev been recorded sucessfully
        if (team_match.scoutId === null) return

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
        const coral_ratio = coral_scored / (coral_failed + coral_scored)

        const algae_scored =
            team_match.auto_score_processor_succeed! +
            team_match.tele_score_processor_succeed!
        const algae_failed =
            team_match.auto_score_processor_fail! +
            team_match.tele_score_processor_fail!
        const algae_ratio = algae_scored / (algae_failed + algae_scored)

        graph_data.match_numbers.push(match_key_to_number(team_match.match_key))
        graph_data.coral_scored.push(coral_scored)
        graph_data.coral_ratio.push(coral_ratio)
        graph_data.algae_scored.push(algae_scored)
        graph_data.algae_ratio.push(algae_ratio)
    })

    const recorded_matches: number = graph_data.match_numbers.length

    const average_coral =
        recorded_matches === 0
            ? undefined
            : graph_data.coral_scored.reduce((acc, n) => acc + n, 0) /
              recorded_matches

    const average_algae =
        recorded_matches === 0
            ? undefined
            : graph_data.algae_scored.reduce((acc, n) => acc + n, 0) /
              recorded_matches

    return {
        key: team_key,
        graph_data,
        average_coral,
        average_algae,
    }
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

function match_key_to_number(match_key: string): number {
    return Number.parseInt(match_key.split("_").pop()!.split("m").pop()!)
}
