import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = ({ params: _ }) => {
    // TODO Query from TBA
    const tba_event_keys = ["2025orbb", "2025pncmp"]

    return { tba_event_keys }
}
