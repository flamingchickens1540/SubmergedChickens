import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { getEventKey } from "@/scripts/dbUtil"
import { prisma } from "@/prisma";
import type { SuperscoutResult } from "@/types"

export const POST: RequestHandler = async ({
    request,
}: any): Promise<Response> => {
    const {scout_id, match_key, results, ratings} : SuperscoutResult = await request.json();

    for (let result of results) {
        const current = await prisma.teamMatch.findUnique({
            where: {
                id_key: {
                    match_key: match_key,
                    team_key: Number.parseInt(result.team_key) // Pls pls pls make team_key a string in the db, I beg
                }
            },
            select: {
                notes: true
            }
        })
        
        let currentNotes = "";
        if (current && current.notes) currentNotes = current.notes;

        await prisma.teamMatch.update({
            where: {
                id_key: {
                    match_key: match_key,
                    team_key: Number.parseInt(result.team_key) // Pls pls pls make team_key a string in the db, I beg
                },
            },
            data: {
                tags: {
                    connect: result.tags.map(parseTag)
                },
                notes: currentNotes + `--- SuperScout w/ id ${scout_id}: ${result.notes}`
            }
        })
    }

    const team_keys = results.map((result) => (result.team_key))
    for (let i = 1; i < 3; i++) {
        for (let j = 0; j < i; j++) {
            prisma.comparison.create({
                data: {
                    team_A_match_key: match_key,
                    team_B_match_key: match_key,
                    team_A_team_key: Number.parseInt(team_keys[i]),
                    team_B_team_key: Number.parseInt(team_keys[j])
                    

                }
            })
        }
    }


    return json(true);
}

function parseTag(tag: String): { name: string; category: string } {
    const parsed = tag.split(" ").map(a => a.replace("(", "").replace(")", ""))
    return {
        name: parsed[0],
        category: parsed[1],
    }
}