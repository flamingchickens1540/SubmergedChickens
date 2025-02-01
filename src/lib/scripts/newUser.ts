import { prisma } from "$lib/prisma"

export async function makeUser(name: string, is_admin: boolean) {
    await prisma.user.create({
        data: {
            username: name,
            is_admin: is_admin,
            is_enabled: true,
        },
    })

    return true
}
