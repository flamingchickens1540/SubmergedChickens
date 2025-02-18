import { PrismaClient } from "@prisma/client"
import { verifyTeamMatch } from "./scripts/TBAVerify"

export const prisma = new PrismaClient().$extends({
    result: {
        teamMatch: {
            IsTBAVerified: {
                needs: { team_key: true, match_key: true },
                async compute(teamMatch) {
                    return await verifyTeamMatch(
                        teamMatch.team_key,
                        teamMatch.match_key
                    )
                },
            },
        },
    },
})
