import { error } from "@/consoleUtils"
import type { RequestHandler } from "../$types"
import { prisma } from "@/prisma"
import type { Team, TeamEvent, TeamMatch } from "@prisma/client"
import { json } from "@sveltejs/kit"
import Action from "../../match-scout/Action.svelte"
import { getEventKey } from "@/scripts/dbUtil"

export const POST: RequestHandler = async ({
    request,
}: any): Promise<Response> => {
    const team_key: number = await request.json()

    let matches = await prisma.teamMatch.findMany({
        where: {
            team_key: team_key,
        },
    })

    if (matches === null)
        console.error(`Getting team matches failed for team ${team_key}`)

    let coral_results: Map<number, number> = new Map()
    let algae_results: Map<number, number> = new Map()

    for (let match of matches) {
        let match_number = Number.parseInt(
            match.match_key.split("_")[1].split("m").at(-1) ?? ""
        )
        coral_results.set(match_number, coralScored(match))
        algae_results.set(match_number, algaeScored(match))
    }

    const event_key =
        (await getEventKey()) ??
        (function () {
            console.error("No event key found")
            return ""
        })()
    let results = await prisma.teamEvent.findUnique({
        where: {
            team_key_event_key: {
                team_key: team_key,
                event_key: event_key,
            },
        },
    })

    if (!results) console.error("No team event found")
    results = results as TeamEvent

    let ability: string = ""
    ability += `Coral:${coralScoreLevels(results)};`
    ability += `Algae:${algaeScoreLocations(results)}`
    ability += `Clean:${cleanScoreLevels(results)};`
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

function cleanScoreLevels(results: TeamEvent) {
    let toBeReturned = ""
    if (results.cleanScoreL2) toBeReturned += "2"
    if (results.cleanScoreL3) toBeReturned += "3"
    return toBeReturned
}

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
