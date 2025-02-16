<script lang="ts">
    import type { PageData } from "./$types"

    let { data }: { data: PageData } = $props()

    type TeamAlliance = {
        allianceNumber: string
        teamNumber: number
        coral: number
        algae: number
        ability: number
    }

    let redTeams: TeamAlliance[] = [
        {
            allianceNumber: "red1",
            teamNumber: data.red1,
            coral: 11,
            algae: 12,
            ability: 13,
        },
        {
            allianceNumber: "red2",
            teamNumber: data.red2,
            coral: 21,
            algae: 22,
            ability: 23,
        },
        {
            allianceNumber: "red3",
            teamNumber: data.red3,
            coral: 31,
            algae: 32,
            ability: 33,
        },
    ]
    let blueTeams: TeamAlliance[] = [
        {
            allianceNumber: "blue1",
            teamNumber: data.blue1,
            coral: 11,
            algae: 12,
            ability: 13,
        },
        {
            allianceNumber: "blue2",
            teamNumber: data.blue2,
            coral: 21,
            algae: 22,
            ability: 23,
        },
        {
            allianceNumber: "blue3",
            teamNumber: data.blue3,
            coral: 31,
            algae: 32,
            ability: 33,
        },
    ]

    // $effect(() => {
    //     console.log(data.blue1)

    // })
</script>

<div
    class="m-auto mb-2 grid h-64 w-full grid-cols-4 gap-2 border-2 border-solid border-imperial_red p-1"
>
    <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
        <div
            class="row-span-1 w-full content-center bg-imperial_red text-center"
        >
            Team
        </div>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-imperial_red"
        >
            Coral
        </div>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-imperial_red"
        >
            Algae
        </div>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-imperial_red"
        >
            Ability
        </div>
    </div>
    {#each redTeams as team}
        <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
            <div
                class="row-span-1 w-full content-center bg-imperial_red text-center"
            >
                {team.allianceNumber} - {team.teamNumber}
            </div>
            <input
                class="row-span-1 w-full bg-gunmetal text-center"
                bind:value={team.coral}
                placeholder="{team.teamNumber} Coral"
                type="text"
            />
            <input
                class="row-span-1 w-full bg-gunmetal text-center"
                bind:value={team.algae}
                placeholder="{team.teamNumber} Algae"
                type="text"
            />
            <input
                class="row-span-1 w-full bg-gunmetal text-center"
                bind:value={team.ability}
                placeholder="{team.teamNumber} Ability"
                type="text"
            />
        </div>
    {/each}
</div>

<div
    class="m-auto grid h-64 w-full grid-cols-4 gap-2 border-2 border-solid border-steel_blue p-1"
>
    <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
        <div class="row-span-1 w-full content-center bg-steel_blue text-center">
            Team
        </div>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-steel_blue"
        >
            Coral
        </div>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-steel_blue"
        >
            Algae
        </div>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-steel_blue"
        >
            Ability
        </div>
    </div>
    {#each blueTeams as team}
        <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
            <div
                class="row-span-1 w-full content-center bg-steel_blue text-center"
            >
                {team.allianceNumber} - {team.teamNumber}
            </div>
            <input
                class="row-span-1 w-full bg-gunmetal text-center"
                bind:value={team.coral}
                placeholder="{team.teamNumber} Coral"
                type="text"
            />
            <input
                class="row-span-1 w-full bg-gunmetal text-center"
                bind:value={team.algae}
                placeholder="{team.teamNumber} Algae"
                type="text"
            />
            <input
                class="row-span-1 w-full bg-gunmetal text-center"
                bind:value={team.ability}
                placeholder="{team.teamNumber} Ability"
                type="text"
            />
        </div>
    {/each}
</div>
