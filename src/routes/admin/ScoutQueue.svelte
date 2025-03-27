<script lang="ts">
    import { X } from "lucide-svelte"
    import { type Socket } from "socket.io-client"
    let {
        socket = $bindable(),
        scout_queue = $bindable(),
    }: { socket: Socket; scout_queue: string[] } = $props()

    socket.emit("get_scout_queue", (response: { scouts: string[] }) => {
        scout_queue = response.scouts
    })

    socket.on("scout_joined_queue", (scout: string) => {
        scout_queue.push(scout)
    })

    socket.on("scout_left_queue", (scout: string) => {
        const index = scout_queue.indexOf(scout)
        if (index === -1) return

        scout_queue.splice(index, 1)
    })

    const remove_scout = (scout_id: string) => {
        const index = scout_queue.indexOf(scout_id)
        if (index === -1) return

        scout_queue.splice(index, 1)

        socket.emit("leave_scout_queue", scout_id)
    }
    const clear_scout_queue = () => {
        for (const scout of scout_queue) {
            socket.emit("leave_scout_queue", scout)
        }
        scout_queue = []
    }

    const can_clear_scouts = $derived(
        scout_queue.length === 0 ? "pointer-events-none opacity-30" : ""
    )
</script>

<div class="col-span-1 row-span-2 flex flex-col gap-2 rounded bg-gunmetal p-2">
    <span class="text-center">Scout Queue</span>
    <div class="grid max-h-64 grid-cols-1 gap-2 overflow-y-scroll">
        {#each scout_queue as scout}
            <div
                class="flex h-10 items-center justify-between rounded bg-eerie_black p-1"
            >
                {scout}
                <button
                    onclick={() => remove_scout(scout)}
                    class="rounded bg-gunmetal p-1"><X /></button
                >
            </div>
        {/each}
    </div>
    <button
        class="mt-auto rounded bg-eerie_black {can_clear_scouts}"
        onclick={clear_scout_queue}>Clear</button
    >
</div>
