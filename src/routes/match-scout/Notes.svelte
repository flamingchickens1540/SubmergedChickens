<script lang="ts">
    import { goto } from "$app/navigation"
    import { swipe, type SwipeCustomEvent } from "svelte-gestures"
    import type { UncountedTeamMatch } from "$lib/types"
    import Header from "./Header.svelte"
    import Timeline from "./Timeline.svelte"
    import { localStore } from "@/localStore.svelte"
    import { io, Socket } from "socket.io-client"

    const username = $state(localStore("username", ""))

    let socket: Socket = io({
        auth: {
            username: username.value,
        },
    })

    const { match_data = $bindable() }: { match_data: UncountedTeamMatch } =
        $props()

    let displaying_timeline = $state(false)

    const submit = async () => {
        await fetch("/api/submitMatch", {
            method: "POST",
            body: JSON.stringify(match_data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const scout_id = match_data.scout_id
        socket.emit("submit_team_match", match_data)
        console.log(match_data)

        goto(`/pairwise?scout=${scout_id}`)
    }
</script>

<div
    class="flex min-h-dvh flex-col"
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={(event: SwipeCustomEvent) => {
        if ((event.detail.direction = "right")) goto("/match-scout/postmatch")
    }}
>
    <div class="m-2 flex flex-grow flex-col gap-2 rounded p-2">
        <span class="font-heading text-xl font-semibold">Notes</span>

        <textarea
            class="w-full flex-grow rounded bg-gunmetal p-2"
            placeholder="Notes..."
            bind:value={match_data.notes}
        ></textarea>

        <button
            onclick={submit}
            class="mt-auto rounded bg-gunmetal p-2 text-lg font-semibold"
        >
            Submit
        </button>
    </div>

    <button
        class="font-heading w-full border-t-2 border-white/10 py-2 text-center text-lg font-semibold"
        onclick={(e: Event) => {
            e.stopPropagation()
            displaying_timeline = true
        }}>Show Timeline</button
    >
    <Timeline
        bind:displaying={displaying_timeline}
        bind:timeline={match_data.timeline}
    />
</div>
