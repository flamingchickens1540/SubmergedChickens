import { TBA_AUTH_KEY } from "$env/static/private"

export async function verifyTeamMatch(
    team_key: number,
    match_key: string
): Promise<boolean> {
    const response = await (
        await fetch(
            `https://www.thebluealliance.com/api/v3/match/${match_key}/simple`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-TBA-Auth-Key": TBA_AUTH_KEY,
                },
            }
        )
    ).json()

    const team_keys: string[] = [
        ...response.alliances.blue.team_keys,
        ...response.alliances.red.team_keys,
    ].map(a => a.slice(3))

    return team_keys.includes(team_key.toString())
}
