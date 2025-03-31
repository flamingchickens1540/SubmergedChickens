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
    tele_actions: Omit<TeleActionData, "id" | "team_match">[],
    auto_actions: Omit<AutoActionData, "id" | "team_match">[],
    tags: { name: string; category: string }[]
) {
    info(JSON.stringify(tm, null, 2))
    const { id_num: id } = await prisma.teamMatch.upsert({
        where: {
            id_key: {
                match_key: tm.match_key,
                team_key: tm.team_key,
            },
        },
        create: {
            ...tm,
            TeleActions: {
                create: tele_actions,
            },
            AutoActions: {
                create: auto_actions,
            },
        },
        update: {
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

    info(`Logged data for team_match ${tm.match_key}:${tm.team_key}`)
}

export async function submitPairwise(pw: Omit<Comparison, "id">) {
    await prisma.comparison.create({
        data: pw,
    })
}
