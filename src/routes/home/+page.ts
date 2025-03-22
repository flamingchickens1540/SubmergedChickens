import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params: _ }) => {
    // const res = await fetch("/api/eventKey/", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })
    //
    // if (!res.ok) return
    //
    // const event_key = (await res.json())["event_key"]

    return {
        event_key: "",
    }
}
