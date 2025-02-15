import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

// TODO: Pull information about the event from the database
export const load: PageLoad = ({ params, url }) => {
  const team_key = url.searchParams.get("team")

  if (!team_key) return error(400, "Bad Query Parameters")

  return {
    team_key,
  }
}