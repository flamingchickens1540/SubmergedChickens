import { API_KEY } from "$env/static/private"
import { getEventKey } from "./dbUtil"
import { warn } from "@/consoleUtils"
import { Endgame } from "@prisma/client"
import { prisma } from "$lib/prisma"

export async function TBAUpdateMatchData(match_key: string) {
    const event_key = await getEventKey()
    const verbose_match_key = event_key + "_" + match_key

    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/match/${verbose_match_key}`,
        {
            method: "GET",
            headers: {
                "If-None-Match": "ETag",
                "Accept": "application/json",
                "X-TBA-Auth-Key": API_KEY,
            },
        }
    )

    if (!res.ok) {
        warn(`TBA /match/${verbose_match_key} request failed: ${res.status}`)
        return
    }

    const match = await res.json()
    const { red, blue } = parseTeamKeysFromMatch(match)

    const scores = match["score_breakdown"]
    const recorded_endgames = await prisma.teamMatch.findMany({
        where: {
            match_key: {
                equals: verbose_match_key,
            },
        },
        select: {
            endgame: true,
            team_key: true,
        },
    })

    for (let i = 1; i <= 3; i++) {
        const red_endgame = determineEndgame(
            scores["red"][`endGameRobot${i}`],
            recorded_endgames.find(match => match.team_key === red[i - 1])
                ?.endgame ?? Endgame.None
        )

        const blue_endgame = determineEndgame(
            scores["blue"][`endGameRobot${i}`],
            recorded_endgames.find(match => match.team_key === blue[i - 1])
                ?.endgame ?? Endgame.None
        )

        await prisma.teamMatch.update({
            where: {
                id_key: {
                    team_key: red[i - 1],
                    match_key: verbose_match_key,
                },
            },
            data: {
                auto_leave_start: scores["red"][`autoLineRobot${i}`] === "Yes",
                endgame: red_endgame,
            },
        })
        await prisma.teamMatch.update({
            where: {
                id_key: {
                    match_key: verbose_match_key,
                    team_key: blue[i - 1],
                },
            },
            data: {
                auto_leave_start: scores["blue"][`autoLineRobot${i}`] == "Yes",
                endgame: blue_endgame,
            },
        })
    }
}

function parseTeamKeysFromMatch(match: any): { red: number[]; blue: number[] } {
    const parse = (color: string): number[] =>
        (match["alliances"][color]["team_keys"] as string[]).map(team =>
            Number.parseInt(team.slice(3))
        )

    return { red: parse("red"), blue: parse("blue") }
}

function determineEndgame(
    tba_endgame: string,
    scout_endgame: Endgame
): Endgame {
    if (tba_endgame === "ShallowCage") {
        return Endgame.Shallow
    }
    if (tba_endgame === "DeepCage") {
        return Endgame.Deep
    }
    if (
        scout_endgame == Endgame.Fail ||
        scout_endgame == Endgame.Deep ||
        scout_endgame == Endgame.Shallow
    ) {
        return Endgame.Fail
    }
    if (tba_endgame === "Parked") {
        return Endgame.Park
    }
    return Endgame.None
}
