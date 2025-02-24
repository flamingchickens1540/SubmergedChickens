import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { makeUser } from "$lib/scripts/newUser"

export const POST: RequestHandler = async ({ request }: any) => {
    const { username, is_admin } = await request.json()
    return json(await makeUser(username, is_admin))
}
