import type { PageServerLoad } from '../$types';
import { prisma } from "$lib/prisma"

export const load = (async ({ params }) => {
	return {
		posts: await prisma.post.findMany({
			where: {
				id: Number(params.postID)
			}
		})
	};
}) satisfies PageServerLoad;