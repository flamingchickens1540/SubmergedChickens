import { prisma } from "$lib/prisma"

export async function preload(event_key: string) {
    // const event_key = await getEventKey() // placeholder until the api is fully working on main

    if (event_key === undefined) {
        console.log("Event key not set yet!")
        return false
    }

    const match_keys = await getMatchesInEvent(event_key)

    const team_matches = await Promise.all(
        match_keys.map(async key => {
            return {
                match_key: key,
                alliances: await getTeamMatch(
                    event_key as `${number}${string}`,
                    key
                ),
            }
        })
    )

    const placeholder_team_matches = team_matches.flatMap(
        ({ match_key, alliances }) =>
            alliances.red.map(team_key => {
                return {
                    match_key: match_key as string,
                    team_key: Number.parseInt(team_key),
                    event_key,
                    // WARNING For some reason it doesn't allow object fields
                    // TeleActions: [] as TeleActionData[],
                    // AutoActions: [] as AutoActionData[],
                }
            })
    )

    await prisma.teamMatch.createMany({
        data: placeholder_team_matches,
    })
}

async function getMatchesInEvent(
    event_key: string
): Promise<`${"qm" | "pm"}${number}`[]> {
    const matches: string[] = await fetch(`/event/${event_key}/matches/keys`)
        .then(async res => await res.json())
        .catch(err => console.error(err))
    return matches as `${"qm" | "pm"}${number}`[]
}

///  @param: event_key - `2024orbb`
/// @param: match_key - `qm1`
///
/// Querie Endpoint: https://www.thebluealliance.com/apidocs/v3
async function getTeamMatch(
    event_key: `${number}${string}`,
    match_key: `${"qm" | "pm"}${number}`
): Promise<{ red: string[]; blue: string[] }> {
    const alliances: any = await fetch(`/match/${event_key}_${match_key}`)
        .then(async res => await res.json())
        .then(json => json["alliances"])
        .catch(err => console.error(err))

    const red = alliances["red"]["team_keys"]
    const blue = alliances["blue"]["team_keys"]

    return { red, blue }
}
