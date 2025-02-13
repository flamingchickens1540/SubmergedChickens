import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params: _, url }) => {
    const scout = url.searchParams.get("scout")
    const match = url.searchParams.get("match")
    const one = url.searchParams.get("one")

    // TODO Create endpoint
    const res = await fetch(`/api/pairwise/last_team/${scout}`)
    if (!res.ok || res.status == 204) redirect(300, "/home")

    const body = await res.json()
    const two = body["team"]

    return {
        scout,
        match,
        one,
        two,
    }
}
