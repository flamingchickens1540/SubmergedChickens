import { prisma } from "$lib/prisma"
import { info } from "@/consoleUtils"
import {
    type TeamMatch,
    type Comparison,
    type TeleActionData,
    type AutoActionData,
} from "@prisma/client"

export async function submitTeamMatch(
    tm: Omit<TeamMatch, "id_num">,
    verbose_match_key: string,
    tele_actions: Omit<TeleActionData, "id" | "team_match">[],
    auto_actions: Omit<AutoActionData, "id" | "team_match">[],
    tags: { name: string; category: string }[]
) {
    const { id_num: id } = await prisma.teamMatch.update({
        where: {
            id_key: {
                match_key: verbose_match_key,
                team_key: tm.team_key,
            },
        },
        data: {
            ...tm,
            TeleActions: {
                create: tele_actions,
            },
            AutoActions: {
                create: auto_actions,
            },
        },
        select: {
            id_num: true,
        },
    })

    // ugly solution b/c Prisma doesn't allow connectOrCreate for multiple tags
    for (let tag of tags) {
        await prisma.teamMatch.update({
            where: {
                id_num: id,
            },
            data: {
                tags: {
                    connectOrCreate: {
                        where: { name: tag.name, category: tag.category },
                        create: tag,
                    },
                },
            },
        })
    }

    info(
        `Logged data for team_match ${tm.event_key}_${tm.match_key}:${tm.team_key}`
    )
}

export async function submitPairwise(pw: Omit<Comparison, "id">) {
    await prisma.comparison.create({
        data: pw,
    })
}
