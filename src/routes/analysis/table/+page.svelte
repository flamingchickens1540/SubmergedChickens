<script lang="ts">
    import LineChart from "@/components/charts/LineChart.svelte"

    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let chartData: any = $state()

    type TeamAlliance = {
        alliance: string
        allianceNumber: number
        teamNumber: number
        coral: number
        algae: number
        ability: string
        coralData: any
        algaeData: any
    }

    let redTeams: TeamAlliance[] = $state([
        { alliance: "red", allianceNumber: 1, teamNumber: data.red1, coral: 11, algae: 12, ability: "ability1", 
            algaeData: {name: data.red1,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 14, 11, 13, 15, 17, 14, 16, 18, 21],
                color: "#004777",},
            coralData: {name: data.red1,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [17, 14, 16, 18, 21, 12, 14, 11, 13, 15,],
                color: "#004777",}
        },
        { alliance: "red", allianceNumber: 2, teamNumber: data.red2, coral: 21, algae: 22, ability: "ability2", 
            algaeData: {name: data.red2,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 14, 16, 18, 21, 11, 13, 15, 17, 14],
                color: "#A30000",},
            coralData: {name: data.red2,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [15, 17, 14, 16, 18, 21, 12, 14, 11, 13, ],
                color: "#A30000",}
        },
        { alliance: "red", allianceNumber: 3, teamNumber: data.red3, coral: 31, algae: 32, ability: "ability3", 
            algaeData: {name: data.red3,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 15, 17, 14, 14, 16, 18, 21, 11, 13],
                color: "#FF7700",},
            coralData: {name: data.red3,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [11, 13, 15, 17, 14, 18, 21, 12, 14, 16,],
                color: "#FF7700",}
        },
    ])

    import Dialog from '@/components/ChartDialog.svelte'
    let dialog: any = $state()

    function openCoral(coralData: any) {
        chartData = coralData
        dialog.showModal()
    }

    function openAlgae(algaeData: any) {
        chartData = algaeData
        dialog.showModal()
    }
</script>
<Dialog bind:dialog>
    <LineChart
        data={[
                chartData
        ]}
        title={"Tele Points vs Match Number"}
        xLabel={"Match Number"}
        yLabel={"Tele Points"}
        width={"300px"}
        height={"300px"}
    />
</Dialog>
<div class="m-auto grid grid-cols-4 gap-1 w-full h-96 p-1 border-2 border-solid border-imperial_red mb-2">
    <div class="col-span-1 row-span-4 grid grid-rows-4 gap-1">
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
    {#each redTeams as team, i}
        <div class="col-span-1 row-span-4 grid grid-rows-4 gap-1">
            <div class="bg-imperial_red row-span-1 w-full text-center content-center">
                {team.alliance}{team.allianceNumber} - {team.teamNumber}
            </div>
            <button class="bg-gunmetal row-span-1 w-full text-center" onclick={() => openCoral(team.coralData)}>{team.coral}</button>
            <button class="bg-gunmetal row-span-1 w-full text-center" onclick={() => openAlgae(team.algaeData)}>{team.algae}</button>
            <div class="bg-gunmetal row-span-1 w-full text-center content-center">{team.ability}</div>
        </div>
    {/each}
</div>