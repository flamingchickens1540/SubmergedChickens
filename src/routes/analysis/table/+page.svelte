<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    type TeamAlliance = {
        allianceNumber: string
        teamNumber: number
        coral: number
        algae: number
        ability: number
    }

    let redTeams: TeamAlliance[] = [
        { allianceNumber: "red1", teamNumber: data.red1, coral: 11, algae: 12, ability: 13 },
        { allianceNumber: "red2", teamNumber: data.red2, coral: 21, algae: 22, ability: 23 },
        { allianceNumber: "red3", teamNumber: data.red3, coral: 31, algae: 32, ability: 33 },
    ]
    let blueTeams: TeamAlliance[] = [
        { allianceNumber: "blue1", teamNumber: data.blue1, coral: 11, algae: 12, ability: 13 },
        { allianceNumber: "blue2", teamNumber: data.blue2, coral: 21, algae: 22, ability: 23 },
        { allianceNumber: "blue3", teamNumber: data.blue3, coral: 31, algae: 32, ability: 33 },
    ]

    // $effect(() => {
    //     console.log(data.blue1) 

    // })
</script>

<div class="m-auto grid grid-cols-4 gap-2 w-full h-64 p-1 border-2 border-solid border-imperial_red mb-2">
    <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
        <div class="bg-imperial_red row-span-1 w-full text-center content-center">
            Team
        </div>
        <div class="bg-gunmetal text-imperial_red row-span-1 w-full text-center content-center">
            Coral
        </div>
        <div class="bg-gunmetal text-imperial_red row-span-1 w-full text-center content-center">
            Algae
        </div>
        <div class="bg-gunmetal text-imperial_red row-span-1 w-full text-center content-center">
            Ability
        </div>
    </div>
    {#each redTeams as team}
        <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
            <div class="bg-imperial_red row-span-1 w-full text-center content-center">
                {team.allianceNumber} - {team.teamNumber}
            </div>
            <input class="bg-gunmetal row-span-1 w-full text-center" bind:value="{team.coral}" placeholder="{team.teamNumber} Coral" type="text">
            <input class="bg-gunmetal row-span-1 w-full text-center" bind:value="{team.algae}" placeholder="{team.teamNumber} Algae" type="text">
            <input class="bg-gunmetal row-span-1 w-full text-center" bind:value="{team.ability}" placeholder="{team.teamNumber} Ability" type="text">
        </div>
    {/each}
</div>

<div class="m-auto grid grid-cols-4 gap-2 w-full h-64 p-1 border-2 border-solid border-steel_blue">
    <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
        <div class="bg-steel_blue row-span-1 w-full text-center content-center">
            Team
        </div>
        <div class="bg-gunmetal text-steel_blue row-span-1 w-full text-center content-center">
            Coral
        </div>
        <div class="bg-gunmetal text-steel_blue row-span-1 w-full text-center content-center">
            Algae
        </div>
        <div class="bg-gunmetal text-steel_blue row-span-1 w-full text-center content-center">
            Ability
        </div>
    </div>
    {#each blueTeams as team}
        <div class="col-span-1 row-span-4 grid grid-rows-4 gap-2">
            <div class="bg-steel_blue row-span-1 w-full text-center content-center">
                {team.allianceNumber} - {team.teamNumber}
            </div>
            <input class="bg-gunmetal row-span-1 w-full text-center" bind:value="{team.coral}" placeholder="{team.teamNumber} Coral" type="text">
            <input class="bg-gunmetal row-span-1 w-full text-center" bind:value="{team.algae}" placeholder="{team.teamNumber} Algae" type="text">
            <input class="bg-gunmetal row-span-1 w-full text-center" bind:value="{team.ability}" placeholder="{team.teamNumber} Ability" type="text">
        </div>
    {/each}
</div>