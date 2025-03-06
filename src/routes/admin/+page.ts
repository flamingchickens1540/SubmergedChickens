import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params: _ }) => {
    const res = await fetch("/api/TBAEventKeys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    // NOTE Error handling done on server side
    const tba_event_keys = await res.json()

    return { tba_event_keys }
}
