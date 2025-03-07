import { json, type RequestHandler } from "@sveltejs/kit"
import { prisma } from "@/prisma"
import { getEventKey } from "@/scripts/dbUtil"

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { images, team_key } = await request.json()

    if (!images || !team_key) {
      return json({ error: "Invalid request data" }, { status: 400 });
    }

    const event_key = await getEventKey();

    if (!event_key) {
      return json({ error: "No event key set" }, { status: 500 });
    }

    const teamEvent = await prisma.teamEvent.findUnique({
      where: {
        team_key_event_key: {
          team_key: parseInt(team_key),
          event_key: event_key,
        },
      },
    });

    if (!teamEvent) {
      return json({ error: "Team event not found" }, { status: 404 });
    }

    const user = await prisma.user.findFirst(); // TODO RESOLVE THIS TERRIBLE FIX PLEASE

    if (!user) {
      return json({ error: "User not found" }, { status: 404 });
    }

    const imageRecords = images.map((image: string) => ({
      data: image,
      team_event_id: teamEvent.id,
      user_id: user.id,
    }));

    await prisma.image.createMany({
      data: imageRecords,
    });

    await prisma.teamEvent.update({
      where: {
        id: teamEvent.id,
      },
      data: {
        imageCollected: true,
      },
    });

    return json({ success: true });
  } catch (error) {
    console.error("Error submitting images:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
