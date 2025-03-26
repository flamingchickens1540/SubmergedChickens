<script lang="ts">
    import { error } from "@/consoleUtils"
    import { localStore } from "@/localStore.svelte"
    import { type Socket } from "socket.io-client"
    import type { CurrentTeamMatch } from "@/types"

    let {
        socket = $bindable(),
        current_robots = $bindable(),
    }: { socket: Socket; current_robots: CurrentTeamMatch[] } = $props()

    let next_match_key = $state(localStore<string>("next_match_key", ""))

    let next_red_robots = $state(
        localStore<string[]>("next_red_robots", ["", "", ""])
    )
    let next_blue_robots = $state(
        localStore<string[]>("next_blue_robots", ["", "", ""])
    )

    async function auto_load_teams() {
        const res = await fetch(`/api/getMatch/${next_match_key.value}`, {
            method: "GET",
        })
        if (!res.ok) {
            error(
                `Failed to get team matches for match ${next_match_key.value}`
            )
            return
        }

        const { red, blue }: { red: string[]; blue: string[] } =
            await res.json()
        next_red_robots.value = red
        next_blue_robots.value = blue
    }

    async function queue_match() {
        let next_robots = [
            ...next_red_robots.value.map(team_key => {
                return {
                    team_key,
                    color: "red",
                }
            }),
            ...next_blue_robots.value.map(team_key => {
                return {
                    team_key,
                    color: "blue",
                }
            }),
        ]
        if (next_robots.some(({ team_key, color: _ }) => team_key === ""))
            return

        socket.emit("send_match", [next_match_key.value, next_robots])

        let robot_queue = [
            ...next_red_robots.value.map(team_key => {
                return { team_key, color: "red" }
            }),
            ...next_blue_robots.value.map(team_key => {
                return { team_key, color: "blue" }
            }),
        ]
        current_robots = robot_queue.map(({ team_key, color }) => {
            return {
                team_key,
                color,
                displaying_tk: true,
                tm_status: "Queue",
            }
        })

        next_red_robots.value = ["", "", ""]
        next_blue_robots.value = ["", "", ""]
    }

    const disabled = "pointer-events-none opacity-30"
    const can_queue = $derived(
        next_red_robots.value.some(r => r === "") ||
            next_blue_robots.value.some(r => r === "")
            ? disabled
            : ""
    )
    const can_autoload = $derived(next_match_key.value === "" ? disabled : "")
</script>

<div class="col-span-2 grid grid-cols-3 gap-2 rounded bg-gunmetal p-2">
    <input
        bind:value={next_match_key.value}
        placeholder="Next Match"
        class="rounded bg-eerie_black p-2"
    />
    <button
        class="rounded bg-eerie_black p-2 {can_autoload}"
        onclick={auto_load_teams}>Auto Load</button
    >
    <button onclick={queue_match} class="rounded bg-eerie_black p-2 {can_queue}"
        >Queue Match</button
    >
    {#each next_red_robots.value as _robot, i}
        <input
            bind:value={next_red_robots.value[i]}
            class="rounded bg-bittersweet p-2"
        />
    {/each}
    {#each next_blue_robots.value as _robot, i}
        <input
            bind:value={next_blue_robots.value[i]}
            class="rounded bg-steel_blue p-2"
        />
    {/each}
</div>
