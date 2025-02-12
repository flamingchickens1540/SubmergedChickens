import { prisma } from "@/prisma";
import type { TeamEvent, Image } from "@prisma/client";

export async function submitPitscout(data: Omit<TeamEvent, "id">, imgs: Omit<Image, "id" | "team_event_id">[]) {
    await prisma.teamEvent.create({
        data: {
            ...data,
            image: {
                create: imgs
            }
        }
    })
}