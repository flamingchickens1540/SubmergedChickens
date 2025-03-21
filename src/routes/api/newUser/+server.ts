import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { makeUser } from "$lib/scripts/newUser"
import { info } from "@/consoleUtils"

export const POST: RequestHandler = async ({
    request,
}: any): Promise<Response> => {
    const { username, is_admin } = await request.json()
    info(`New User: ${username}`)
    return json(await makeUser(username, is_admin))
}
