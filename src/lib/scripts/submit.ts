import { prisma } from "$lib/prisma"
import { type TeamMatch, type Comparison, type Tag } from "@prisma/client"

export async function submitTeamMatch(
    tm: Omit<TeamMatch, "id_num">,
    tagNames: string[]
) {
    // Todo: confirm that omit works this way
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
                connect: namesToTagQuery(tagNames),
            },
        },
    })
}

function namesToTagQuery(tagNames: string[]) : {name: string}[] {
    let toBeReturned = []
    for (let a in tagNames) {
        toBeReturned.push({name: a});
    }
    return toBeReturned;
}

export async function submitPairwise(pw: Omit<Comparison, "id">) {
    await prisma.comparison.create({
        data: pw
    })
}
