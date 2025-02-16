import type { PageServerLoad } from "./$types"
import { prisma } from "$lib/prisma"
import { analyze_comparisons, type Comparison } from "@/scripts/pairwise"

export const load = (async () => {
  //TODO: pull from db  
  const data: Comparison<number>[] = [
            { teamA: 1101, teamB: 1102, diff: 0 },
            { teamA: 1101, teamB: 1103, diff: 1 },
            { teamA: 1101, teamB: 1104, diff: 2 },
            { teamA: 1101, teamB: 1105, diff: 2 },
            { teamA: 1101, teamB: 1109, diff: 2 },
            { teamA: 1102, teamB: 1103, diff: 0 },
            { teamA: 1102, teamB: 1104, diff: 2 },
            { teamA: 1102, teamB: 1106, diff: 2 },
            { teamA: 1102, teamB: 1110, diff: 2 },
            { teamA: 1103, teamB: 1104, diff: 1 },
            { teamA: 1103, teamB: 1107, diff: 2 },
            { teamA: 1103, teamB: 1111, diff: 2 },
            { teamA: 1104, teamB: 1105, diff: 0 },
            { teamA: 1104, teamB: 1106, diff: 0 },
            { teamA: 1104, teamB: 1109, diff: 1 },
            { teamA: 1104, teamB: 1112, diff: 2 },
            { teamA: 1105, teamB: 1106, diff: 0 },
            { teamA: 1105, teamB: 1107, diff: 0 },
            { teamA: 1105, teamB: 1110, diff: 1 },
            { teamA: 1105, teamB: 1113, diff: 2 },
            { teamA: 1106, teamB: 1107, diff: 0 },
            { teamA: 1106, teamB: 1108, diff: 0 },
            { teamA: 1106, teamB: 1111, diff: 1 },
            { teamA: 1106, teamB: 1114, diff: 2 },
            { teamA: 1107, teamB: 1108, diff: 0 },
            { teamA: 1107, teamB: 1109, diff: 1 },
            { teamA: 1107, teamB: 1115, diff: 2 },
            { teamA: 1108, teamB: 1109, diff: 1 },
            { teamA: 1108, teamB: 1110, diff: 1 },
            { teamA: 1108, teamB: 1116, diff: 2 },
            { teamA: 1109, teamB: 1110, diff: 0 },
            { teamA: 1109, teamB: 1111, diff: 0 },
            { teamA: 1109, teamB: 1112, diff: 1 },
            { teamA: 1110, teamB: 1111, diff: 0 },
            { teamA: 1110, teamB: 1113, diff: 1 },
            { teamA: 1110, teamB: 1114, diff: 1 },
            { teamA: 1111, teamB: 1112, diff: 1 },
            { teamA: 1111, teamB: 1115, diff: 1 },
            { teamA: 1111, teamB: 1116, diff: 1 },
            { teamA: 1112, teamB: 1113, diff: 0 },
            { teamA: 1112, teamB: 1114, diff: 0 },
            { teamA: 1112, teamB: 1115, diff: 0 },
            { teamA: 1113, teamB: 1114, diff: 0 },
            { teamA: 1113, teamB: 1115, diff: 0 },
            { teamA: 1113, teamB: 1116, diff: 0 },
            { teamA: 1114, teamB: 1115, diff: 0 },
            { teamA: 1114, teamB: 1116, diff: 0 },
            { teamA: 1115, teamB: 1116, diff: 0 },
        ]

    return {
        comparisons: analyze_comparisons(data),
    }
}) satisfies PageServerLoad