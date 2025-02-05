import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { submitPairwise } from "$lib/scripts/submit"
import type { Comparison } from "@prisma/client"

export const POST: RequestHandler = async ({ request }: any) => {
    const comp : Omit<Comparison, "id"> = await request.json()
    return json(await submitPairwise(comp))
}
