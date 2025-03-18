import { error } from "@/consoleUtils"
import type { RequestHandler } from "../$types"
import { prisma } from "@/prisma"
import type { Team, TeamMatch } from "@prisma/client"
import { json } from "@sveltejs/kit"
import Action from "../../match-scout/Action.svelte"

export const POST: RequestHandler = async ({
    request,
}: any): Promise<Response> => {
    const team_key: number = await request.json()

    let team: Team | null = await prisma.team.findUnique({
        where: {
            key: team_key,
        },
    })

    if (!team) error("team_key is not valid")
    team = team as Team

    let matches = await prisma.teamMatch.findMany({
        where: {
            team: team,
        },
    })

    if (matches == null) console.error("Getting team match failed")

    let coral_results: Map<number, number> = new Map()
    let algae_results: Map<number, number> = new Map()

    for (let match of matches) {
        let number = Number.parseInt(
            match.match_key.split("_")[1].split("m").at(-1) ?? ""
        )
        coral_results.set(number, coralScored(match))
        algae_results.set(number, algaeScored(match))
    }

    let ability: string = ""
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
