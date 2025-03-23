import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { prisma } from "@/prisma"

export const load: PageServerLoad = async ({ url }) => {
    const match_key = url.searchParams.get("match")
    const team_key = url.searchParams.get("team")
    const color = url.searchParams.get("color")

    if (
        !team_key ||
        !match_key ||
        !color ||
        (color != "blue" && color != "red")
    )
        return error(400, "Bad Query Parameters")

    const tags = await prisma.tag.findMany({})

    return {
        match_key,
        team_key: Number.parseInt(team_key),
        color: color as "blue" | "red",
        tags,
    }
}
