import { prisma } from "$lib/prisma"
import { type TeamMatch, type Comparison, type Tag } from "@prisma/client"

export async function submitTeamMatch(
    tm: Omit<TeamMatch, "id_num">,
    tagNames: string[]
) {
    await prisma.teamMatch.update({
        where: {
            id_key: {
                match_key: tm.match_key,
                team_number: tm.team_number,
            },
        },
        data: {
            ...tm,
            tags: {
                connect: tagNames.map((name) => ({name}))
            },
        },
    })
}

export async function submitPairwise(pw: Omit<Comparison, "id">) {
    await prisma.comparison.create({
        data: pw,
    })
}
