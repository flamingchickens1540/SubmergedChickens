import { json as sveltejson } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { prisma } from "$lib/prisma"
import type { Drivetrain } from "@prisma/client"
import { json as sveltejson } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { prisma } from "$lib/prisma"
import type { Drivetrain } from "@prisma/client"

export const POST: RequestHandler = async ({ request }: any): Promise<Response> => {
  const json = await request.json();
  const team_key = json.team_key;
  const event_key = json.event_key;
  const summary = json.summary;
  const drivetrain = json.drivetrain as Drivetrain;
export const POST: RequestHandler = async ({
    request,
}: any): Promise<Response> => {
    const json = await request.json()
    const team_key = json.team_key
    const event_key = json.event_key
    const summary = json.summary
    const drivetrain = json.drivetrain as Drivetrain

    console.log("TEAMKEYFIND" + team_key)
export const POST: RequestHandler = async ({
    request,
}: any): Promise<Response> => {
    const json = await request.json()
    const team_key = json.team_key
    const event_key = json.event_key
    const summary = json.summary
    const drivetrain = json.drivetrain as Drivetrain

    const data = {
        coralScoreL1: json.l1 === true,
        coralScoreL2: json.l2 === true,
        coralScoreL3: json.l3 === true,
        coralScoreL4: json.l4 === true,
        cleanScoreL2: json.cleanl2 === true,
        cleanScoreL3: json.cleanl3 === true,
        algaeScoreProcessor: json.processor === true,
        algaeScoreNet: json.net === true,
        coralIntakeSource: json.source === true,
        coralIntakeGround: json.ground === true,
        algaeIntakeLollipop: json.lollipop === true,
        algaeIntakeGround: json.algaeground === true,
        algaeIntakeL3: json.algaereefl3 === true,
        algaeIntakeL2: json.algaereefl2 === true,
        shallowClimb: json.shallow === true,
        deepClimb: json.deep === true,
        summary,
        drivetrain,
        dataCollected: true,
    }
    const data = {
        coralScoreL1: json.l1 === true,
        coralScoreL2: json.l2 === true,
        coralScoreL3: json.l3 === true,
        coralScoreL4: json.l4 === true,
        cleanScoreL2: json.cleanl2 === true,
        cleanScoreL3: json.cleanl3 === true,
        algaeScoreProcessor: json.processor === true,
        algaeScoreNet: json.net === true,
        coralIntakeSource: json.source === true,
        coralIntakeGround: json.ground === true,
        algaeIntakeLollipop: json.lollipop === true,
        algaeIntakeGround: json.algaeground === true,
        algaeIntakeL3: json.algaereefl3 === true,
        algaeIntakeL2: json.algaereefl2 === true,
        shallowClimb: json.shallow === true,
        deepClimb: json.deep === true,
        summary,
        drivetrain,
        dataCollected: true,
    }

    await prisma.teamEvent.update({
        where: {
            team_key_event_key: {
                team_key,
                event_key,
            },
        },
        data,
    })
    await prisma.teamEvent.update({
        where: {
            team_key_event_key: {
                team_key,
                event_key,
            },
        },
        data,
    })

    return sveltejson({ success: true })
}
    return sveltejson({ success: true })
}
