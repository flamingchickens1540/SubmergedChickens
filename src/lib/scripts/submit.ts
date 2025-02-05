import { prisma } from "$lib/prisma"
import { type TeamMatch, type Comparison } from "@prisma/client"

export async function submitTeamMatch(tm: Omit<TeamMatch, "id_num">) {
    // Todo: confirm that omit works this way
    await prisma.teamMatch.update({
        where: {
            id_key: {
                match_key: tm.match_key,
                team_number: tm.team_number,
            },
        },
        data: tm,
    })
}

export async function submitPairwise(pw: Comparison) {
    await prisma.comparison.create({
        data: pw,
    })
}
