<script lang="ts">
    let next_red_robots = $state(["1678", "254", "1341"])
    let next_blue_robot = $state(["394", "1930", "1540"])

    let curr_red_robots = $state(["1678", "256", "1341"])
    let curr_blue_robot = $state(["394", "1930", "1540"])

    let bug_title = $state("")
    let bug_description = $state("")

    let bug_reports: { title: string; description: string }[] = $state([])

    let scout_queue: string[] = $state([])
</script>

<div class="grid grid-flow-row grid-cols-3 grid-rows-2 gap-4">
    <div class="grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline">
        <button class="rounded p-2 outline">Queue Next Match</button>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each next_red_robots as robot}
                <button class="rounded bg-red-500 p-2 outline">{robot}</button>
            {/each}
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each next_blue_robot as robot}
                <button class="rounded bg-blue-500 p-2 outline">{robot}</button>
            {/each}
        </div>
    </div>
    >
    <div class="grid grid-cols-1 grid-rows-3 gap-2 rounded p-2 outline">
        <button class="rounded p-2 outline">Currently Scouting</button>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each curr_red_robots as robot}
                <button class="rounded bg-red-500 p-2 outline">{robot}</button>
            {/each}
        </div>
        <div class="grid grid-cols-3 grid-rows-1 gap-2">
            {#each curr_blue_robot as robot}
                <button class="rounded bg-blue-500 p-2 outline">{robot}</button>
            {/each}
        </div>
    </div>
    <div class="text-align grid gap-2 rounded p-2 outline">
        <button class="grid outline">Send Bug</button>
        <input
            bind:value={bug_title}
            class="grid outline"
            placeholder="Bug Title"
        />
        <input
            bind:value={bug_description}
            class="grid outline"
            placeholder="Bug Description"
        />
    </div>
    <div class="grid outline">
        <div>Bug Reports</div>
        <div>
            {#each bug_reports as bug_report}
                <div class="grid">
                    <button class="grid outline">{bug_report.title}</button>
                    <button class="grid outline">FW</button>
                </div>
            {/each}
        </div>
    </div>
    <div class="row-span-2 grid outline">
        <div>Queue</div>
        {#each scout_queue as scout}
            <div class="grid outline">{scout}</div>
        {/each}
    </div>
</div>
