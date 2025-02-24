import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params: _ }) => {
    const res = await fetch("/api/TBAEventKeys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const tba_event_keys = res.ok ? await res.json() : []
    if (tba_event_keys.length === 0) {
        console.error(`TBA EventKeys request failed: ${res.status}`)
    }

    return { tba_event_keys }
}
