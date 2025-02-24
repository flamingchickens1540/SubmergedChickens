import { preload } from "@/scripts/preload"
import type { RequestHandler } from "@sveltejs/kit"
import { json } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request }: any) => {
    const {
        use_tba,
        data,
    }: { use_tba: boolean; data: { team_key: number; match_key: string }[] } =
        await request.json()
    if (use_tba) {
        console.log("What's TBA?")
        return json(false)
    } else {
        return json(await preload(data))
    }
}
