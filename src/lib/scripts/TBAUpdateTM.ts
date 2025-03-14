import { API_KEY } from "$env/static/private"
import { getEventKey } from "./dbUtil"
import { warn } from "@/consoleUtils"
import { prisma } from "$lib/prisma"

export async function updateTBAMatchData(match_key: string) {
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
    const red: number[] = (
        match["alliances"]["red"]["team_keys"] as string[]
    ).map(team => Number.parseInt(team.slice(3)))
    const blue: number[] = (
        match["alliances"]["blue"]["team_keys"] as string[]
    ).map(team => Number.parseInt(team.slice(3)))
    const scores = match["score_breakdown"]
    for (let i = 1; i <= 3; i++) {
        console.log(`${verbose_match_key}, ${red[i - 1]} `)
        prisma.teamMatch.update({
            where: {
                id_key: {
                    match_key: match_key,
                    team_key: red[i - 1],
                },
            },
            data: {
                auto_leave_start: true, // scores["red"][`autoLineRobot${i}`] === "Yes",
                // endgame: scores["red"][`endGameRobot${i}`].toString(), // None, Parked, ShallowCage, DeepCage
            },
        })
        prisma.teamMatch.update({
            where: {
                id_key: {
                    match_key: match_key,
                    team_key: blue[i - 1],
                },
            },
            data: {
                auto_leave_start: true, // scores["blue"][`autoLineRobot${i}`] == "Yes",
                // endgame: scores["blue"][`endGameRobot${i}`],
            },
        })
    }
}
