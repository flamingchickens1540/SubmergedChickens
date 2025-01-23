<script lang="ts">
    let next_match = $state("")

    let next_red_robots = $state(["1678", "254", "1341"])
    let next_blue_robot = $state(["394", "1930", "1540"])

    let curr_red_robots = $state(["1678", "256", "1341"])
    let curr_blue_robot = $state(["394", "1930", "1540"])

    let new_users: string[] = $state(["Azalea", "Zach", "Autumn"])

    let scout_queue: string[] = $state([])
</script>

<div class="ml-2 mr-2 mt-2 grid grid-flow-col grid-cols-4 grid-rows-2 gap-4">
    <div
        class="col-span-2 grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline"
    >
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            <input
                bind:value={next_match}
                placeholder="Next Match"
                class="rounded p-2 outline"
            />
            <button class="rounded p-2 outline">Auto Load</button>
            <button class="rounded p-2 outline">Queue Match</button>
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each next_red_robots as _robot, i}
                <input
                    bind:value={next_red_robots[i]}
                    class="rounded bg-red-500 p-2 outline"
                />
            {/each}
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each next_blue_robot as _robot, i}
                <input
                    bind:value={next_blue_robot[i]}
                    class="rounded bg-blue-500 p-2 outline"
                />
            {/each}
        </div>
    </div>
    <div
        class="col-span-2 grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline"
    >
        <button class="rounded p-2 outline">Currently Scouting</button>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each curr_red_robots as _robot, i}
                <input
                    bind:value={curr_red_robots[i]}
                    class="rounded bg-red-500 p-2 outline"
                />
            {/each}
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each curr_blue_robot as _robot, i}
                <input
                    bind:value={curr_blue_robot[i]}
                    class="rounded bg-blue-500 p-2 outline"
                />
            {/each}
        </div>
    </div>
    <div
        class="text-align row-span-2 grid gap-2 overflow-y-scroll rounded p-2 outline"
    >
        {#each new_users as user}
            <div class="grid grid-cols-2 text-center">
                {user}
                <button class="rounded outline">Approve</button>
            </div>
        {/each}
    </div>
    <div class="row-span-2 grid rounded p-2 outline">
        <div>Queue</div>
        {#each scout_queue as scout}
            <div class="grid outline">{scout}</div>
        {/each}
    </div>
</div>
