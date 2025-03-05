import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({params, url}) => {
    const red1: number = url.searchParams.get("red1")
    const red2: number = url.searchParams.get("red2")
    const red3: number = url.searchParams.get("red3")
    const blue1: number = url.searchParams.get("blue1")
    const blue2: number = url.searchParams.get("blue2")
    const blue3: number = url.searchParams.get("blue3")
    
    return {
        red1, red2, red3, blue1, blue2, blue3
    }

}) satisfies PageServerLoad;