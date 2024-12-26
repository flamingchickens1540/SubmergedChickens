import type { PageServerLoad } from "./$types"
import { prisma } from "$lib/prisma"

export const load = (async () => {
    const getPosts = async () => {
        const posts = await prisma.post.findMany()

        return posts
    }

    return {
        posts: await getPosts(),
    }
}) satisfies PageServerLoad
