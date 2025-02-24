import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params: _ }) => {
    const event_keys_res = await fetch("/api/TBAEventKeys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const tba_event_keys = await event_keys_res.json()
    console.log(tba_event_keys)

    return { tba_event_keys }
}
