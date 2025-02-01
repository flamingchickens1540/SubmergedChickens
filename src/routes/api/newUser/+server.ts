import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { makeUser } from "$lib/scripts/newUser"

export const POST: RequestHandler = async ({ request }: any) => {
    const { name, is_admin } = await request.json()
    return json(await makeUser(name, is_admin))
}
