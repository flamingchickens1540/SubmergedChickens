import { prisma } from "$lib/prisma"
import { info } from "@/consoleUtils"
import {
    type TeamMatch,
    type Comparison,
    type TeleActionData,
    type AutoActionData,
    type TeamEvent,
} from "@prisma/client"

export async function submitTeamMatch(
    tm: Omit<TeamMatch, "id_num">,
    verbose_match_key: string,
    tele_actions: Omit<Omit<TeleActionData, "id">, "team_match">[],
    auto_actions: Omit<Omit<AutoActionData, "id">, "team_match">[],
    tagNames: string[]
) {
    await prisma.teamMatch.update({
        where: {
            id_key: {
                match_key: verbose_match_key,
                team_key: tm.team_key,
            },
        },
        data: {
            ...tm,
            tags: {
                connect: tagNames.map(name => ({ name })),
            },
            TeleActions: {
                create: tele_actions,
            },
            AutoActions: {
                create: auto_actions,
            },
        },
    })
    info(
        `Logged data for team_match ${tm.event_key}_${tm.match_key}:${tm.team_key}`
    )
}

export async function submitPairwise(pw: Omit<Comparison, "id">) {
    await prisma.comparison.create({
        data: pw,
    })
}

export async function submitTeamEvent(
    teamEvent: Omit<TeamEvent, "id" | "dataCollected" | "imageCollected">
) {
    await prisma.teamEvent.update({
        where: {
            team_key_event_key: {
                team_key: teamEvent.team_key,
                event_key: teamEvent.event_key,
            },
        },
        data: {
            ...teamEvent,
            dataCollected: true,
            imageCollected: true,
        },
    })
}
