import { prisma } from "$lib/prisma"
import { json } from "@sveltejs/kit"
import { getEventKey } from "./dbUtil"

export async function preload(data: { team_key: number; match_key: string }[]) {
    const event_key = await getEventKey() // placeholder until the api is fully working on main

    if (event_key === undefined) {
        console.log("Event key not set yet!")
        return false
    }

    await prisma.teamMatch.createMany({
        data: data.map(match => ({ ...match, event_key: event_key })),
    })
}
