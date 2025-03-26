<script lang="ts">
    import type { AutoPageState } from "$lib/types"
    import type { AutoAction } from "@prisma/client"

    let {
        page_state = $bindable(),
        action_state = $bindable(),
        incap_times = $bindable(),
        bg_color,
    }: {
        page_state: AutoPageState
        action_state: AutoAction | null
        incap_times: number[]
        bg_color: string
    } = $props()

    let total_time = $state(0)

    setInterval(() => {
        total_time++
    }, 1000)

    const recap = () => {
        action_state = null
        page_state = "None"
        incap_times.push(total_time)
    }
</script>

<button
    class="flex-grow rounded {bg_color} text-xl font-semibold"
    onclick={recap}>Re-Capacitate</button
>
<div class="w-full p-2 text-center text-xl font-semibold">
    {total_time} Seconds
</div>
