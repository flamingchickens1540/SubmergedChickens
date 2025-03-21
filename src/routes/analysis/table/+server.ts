import { warn } from "@/consoleUtils"
import { prisma } from "@/prisma"
import type { PageServerLoad } from "./$types"
import type { TeamEvent, TeamMatch } from "@prisma/client"
import { json, redirect } from "@sveltejs/kit"
import { getEventKey } from "@/scripts/dbUtil"
import { matchKeyToNumber } from "@/utils"

export const GET: PageServerLoad = async ({
    request,
}: any): Promise<Response> => {
    const team_key: number = await request.json()

    const event_key = (await getEventKey()) ?? ""
    if (event_key === "") {
        console.error("No event key found")
        // TODO: Azalea, put good thing here <3
    }

    const team_matches = await prisma.teamMatch.findMany({
        where: {
            team_key: team_key,
            event_key: event_key
        },
    })

    if (team_matches.length === 0) {
        warn(`No TeamMatches found for team ${team_key}`)
    }

    const coral_results: Map<number, number> = new Map()
    const algae_results: Map<number, number> = new Map()

    for (const team_match of team_matches) {
        const match_number = matchKeyToNumber(team_match.match_key)

        coral_results.set(match_number, coralScored(team_match))
        algae_results.set(match_number, algaeScored(team_match))
    }

    let results = (await prisma.teamEvent.findUnique({
        where: {
            team_key_event_key: {
                team_key,
                event_key,
            },
        },
    })) as TeamEvent | null

    if (results == null) {
        warn(`No team events found for ${team_key} at ${event_key}`)
        // TODO: Azalea, put good thing here <3
    }
    results = results as TeamEvent;

    let ability: string = ""
    ability += `Coral:${coralScoreLevels(results)};`
    ability += `Algae:${algaeScoreLocations(results)}`
    // ability += `Clean:${cleanScoreLevels(results)};`
    ability += `Climb:${climbAbility(results)}`

    return json({
        coral_results,
        algae_results,
        ability,
    })
}

function coralScored(match: TeamMatch): number {
    return [
        match.auto_score_l1_succeed ?? 0,
        match.auto_score_l2_succeed ?? 0,
        match.auto_score_l3_succeed ?? 0,
        match.auto_score_l4_succeed ?? 0,

        match.tele_score_l1_succeed ?? 0,
        match.tele_score_l2_succeed ?? 0,
        match.tele_score_l3_succeed ?? 0,
        match.tele_score_l4_succeed ?? 0,
    ].reduce((a, b) => a + b)
}

function algaeScored(match: TeamMatch): number {
    return [
        match.auto_score_net_succeed ?? 0,
        match.auto_score_processor_succeed ?? 0,

        match.tele_score_net_succeed ?? 0,
        match.tele_score_processor_succeed ?? 0,
    ].reduce((a, b) => a + b)
}

function coralScoreLevels(results: TeamEvent) {
    let toBeReturned = ""
    if (results.coralScoreL1) toBeReturned += "1"
    if (results.coralScoreL2) toBeReturned += "2"
    if (results.coralScoreL3) toBeReturned += "3"
    if (results.coralScoreL4) toBeReturned += "4"
    return toBeReturned
}

// function cleanScoreLevels(results: TeamEvent) {
//     let toBeReturned = ""
//     if (results.cleanScoreL2) toBeReturned += "2"
//     if (results.cleanScoreL3) toBeReturned += "3"
//     return toBeReturned
// }

function algaeScoreLocations(results: TeamEvent) {
    let toBeReturned = ""
    if (results.algaeScoreProcessor) toBeReturned += "P"
    if (results.algaeScoreNet) toBeReturned += "N"
    return toBeReturned
}

function climbAbility(results: TeamEvent) {
    let toBeReturned = ""
    if (results.shallowClimb) toBeReturned += "S"
    if (results.deepClimb) toBeReturned += "D"
    return toBeReturned
}
