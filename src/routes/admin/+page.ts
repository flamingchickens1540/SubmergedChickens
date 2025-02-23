import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = ({ params: _ }) => {
    // TODO Query from TBA
    const tba_event_keys = ["2022orore", "2022orwil", "2022pncmp"]

    return { tba_event_keys }
}
