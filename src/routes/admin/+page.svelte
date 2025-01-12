<script lang="ts">
    let next_red_robots = $state(["1678", "254", "1341"])
    let next_blue_robot = $state(["394", "1930", "1540"])

    let curr_red_robots = $state(["1678", "256", "1341"])
    let curr_blue_robot = $state(["394", "1930", "1540"])
</script>

<div class="grid grid-flow-col grid-cols-3 grid-rows-2">
    <div
        class="grid grid-cols-4 grid-rows-2 place-items-center p-4 text-center align-middle"
    >
        <div class="grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline">
            <button class="rounded p-2 outline">Queue Next Match</button>
            <div class="grid grid-cols-3 grid-rows-1 gap-2">
                {#each next_red_robots as robot}
                    <button class="rounded bg-red-500 p-2 outline"
                        >{robot}</button
                    >
                {/each}
            </div>
            <div class="grid grid-cols-3 grid-rows-1 gap-2">
                {#each next_blue_robot as robot}
                    <button class="rounded bg-blue-500 p-2 outline"
                        >{robot}</button
                    >
                {/each}
            </div>
        </div>
    </div>
    <div
        class="grid grid-cols-4 grid-rows-2 place-items-center p-4 text-center align-middle"
    >
        <div class="grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline">
            <button class="rounded p-2 outline">Currently Scouting</button>
            <div class="grid grid-cols-3 grid-rows-1 gap-2">
                {#each curr_red_robots as robot}
                    <button class="rounded bg-red-500 p-2 outline"
                        >{robot}</button
                    >
                {/each}
            </div>
            <div class="grid grid-cols-3 grid-rows-1 gap-2">
                {#each curr_blue_robot as robot}
                    <button class="rounded bg-blue-500 p-2 outline"
                        >{robot}</button
                    >
                {/each}
            </div>
        </div>
    </div>
    <div class="grid border">
        <button>Send Bug</button>
    </div>
</div>
