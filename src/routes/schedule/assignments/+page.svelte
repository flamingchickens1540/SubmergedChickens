<script lang="ts">
    import type { TimeSlot } from "@/types"

    let slots: {
        timeSlot: TimeSlot
    }[] = $state([])

    // testing
    slots = [
        {
            timeSlot: {
                time: "time2",
                tasks: [
                    {
                        taskName: "task1.5",
                        people: [
                            { name: "another name", assignments: [] },
                            { name: "some guy", assignments: [] },
                        ],
                    },
                    {
                        taskName: "task2",
                        people: [{ name: "name2", assignments: [] }],
                    },
                ],
            },
        },
        {
            timeSlot: {
                time: "time",
                tasks: [
                    {
                        taskName: "task",
                        people: [{ name: "name", assignments: [] }],
                    },
                ],
            },
        },
    ]
</script>

<div class="flex flex-col">
    {#each slots as slot}
        <div class="m-2 flex w-full flex-col gap-2 rounded bg-gunmetal p-4">
            <span> {slot.timeSlot.time} </span>
            {#each slot.timeSlot.tasks as task}
                <div
                    class="m-2 flex w-full flex-col gap-2 rounded bg-eerie_black p-4"
                >
                    <span> {task.taskName} </span>
                    {#each task.people as person}
                        <div
                            class="m-2 flex w-full flex-col gap-2 rounded bg-gunmetal p-4"
                        >
                            <span> {person.name} </span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    {/each}
</div>
