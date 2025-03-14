import { API_KEY } from "$env/static/private"
import { getEventKey } from "./dbUtil"
import { warn } from "@/consoleUtils"
import { prisma } from "$lib/prisma"

export async function updateTBAMatchData(match_key: string) {
    const event_key = await getEventKey()

    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/match/${event_key}_${match_key}`,
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
        warn(`TBA /match/${match_key} request failed: ${res.status}`)
        return
    }

    const match = await res.json()
    const red: string[] = (
        match["alliances"]["red"]["team_keys"] as string[]
    ).map(team => team.slice(3))
    const blue: string[] = (
        match["alliances"]["blue"]["team_keys"] as string[]
    ).map(team => team.slice(3))
    const scores = match["score_breakdown"]
    for (let i = 1; i <= 3; i++) {
        prisma.teamMatch.update({
            where: {
                id_key: {
                    match_key,
                    team_key: Number.parseInt(red[i - 1]),
                },
            },
            data: {
                auto_leave_start: scores["red"][`autoLineRobot${i}`] == "Yes",
                endgame: scores["red"][`endGameRobot${i}`], // None, Parked, ShallowCage, DeepCage
            },
        })
        prisma.teamMatch.update({
            where: {
                id_key: {
                    match_key,
                    team_key: Number.parseInt(blue[i - 1]),
                },
            },
            data: {
                auto_leave_start: scores["blue"][`autoLineRobot${i}`] == "Yes",
                endgame: scores["blue"][`endGameRobot${i}`],
            },
        })
    }
}
