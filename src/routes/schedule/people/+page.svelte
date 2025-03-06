<script lang="ts">
    import type { CompPerson } from "@/types"

    let people: CompPerson[] = $state([])

    people = [
        {
            name: "name",
            assignments: [
                { time: "time", tasks: [{ taskName: "taskName", people: [] }] },
            ],
        },
    ]
</script>

<div class="m-2 flex w-full flex-col gap-2 rounded bg-gunmetal p-4">
    {#each people as person}
        <span> {person.name} </span>
        <div class="m-2 flex w-full flex-col gap-2 rounded bg-eerie_black p-4">
            <p>
                {#each person.assignments as assignment}
                    {assignment.time} {assignment.tasks[0].taskName}
                {/each}
            </p>
        </div>
    {/each}
</div>
