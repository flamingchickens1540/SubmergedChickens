<script lang="ts">
    import { goto } from "$app/navigation"
    import type { UncountedTeamMatch } from "$lib/types"
    import Timeline from "./Timeline.svelte"
    import { LocalStore, localStore } from "@/localStore.svelte"
    import { io, Socket } from "socket.io-client"

    const username = $state(localStore("username", ""))

    let socket: Socket = io({
        auth: {
            username: username.value,
        },
    })

    const {
        match_data = $bindable(),
        game_stage = $bindable(),
    }: {
        match_data: LocalStore<UncountedTeamMatch>
        game_stage: LocalStore<string>
    } = $props()

    let displaying_timeline = $state(false)

    const submit = async () => {
        await fetch("/api/submitMatch", {
            method: "POST",
            body: JSON.stringify(match_data.value),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const scout_id = match_data.value.scout_id
        socket.emit("submit_team_match", match_data.value)
        console.log(match_data.value)
        match_data.reset()
        game_stage.reset()

        goto(`/pairwise?scout=${scout_id}`)
    }
</script>

<div class="m-2 flex flex-1 flex-grow flex-col gap-2 px-2">
    <span class="font-heading text-xl font-semibold">Notes</span>

    <textarea
        class="w-full flex-grow rounded bg-gunmetal p-2"
        placeholder="Notes..."
        bind:value={match_data.value.notes}
    ></textarea>

    <button
        onclick={submit}
        class="rounded bg-gunmetal p-2 text-xl font-semibold"
    >
        Submit
    </button>
</div>
