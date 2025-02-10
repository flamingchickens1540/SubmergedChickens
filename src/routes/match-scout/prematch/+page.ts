import { error, redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = ({ params, url }) => {
    const match_key = url.searchParams.get("match")
    const team_key = url.searchParams.get("team")
    const color = url.searchParams.get("color")

    if (!team_key || !match_key || !color)
        return error(400, "Bad Query Parameters")

    return {
        match_key,
        team_key,
        color,
    }
}
