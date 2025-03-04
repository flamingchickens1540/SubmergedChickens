import { prisma } from "$lib/prisma"

export async function makeUser(
    username: string,
    is_admin: boolean
): Promise<number> {
    const user = await prisma.user.create({
        data: {
            username,
            is_admin,
        },
    })

    return user.id
}
