<script lang="ts">
    import LineChart from "@/components/charts/LineChart.svelte"

    import type { PageData } from "./$types"

    let { data }: { data: PageData } = $props()

    type TeamAlliance = {
        teamColor: string
        allianceNumber: string
        teamNumber: number
        coral: number
        algae: number
        ability: string
        coralData: any
        algaeData: any
    }

    let redTeams: TeamAlliance[] = $state([
        {
            teamColor: "jungle_green",
            allianceNumber: "red1",
            teamNumber: data.red1,
            coral: 11,
            algae: 12,
            ability: "ability1",
            algaeData: {
                name: data.red1,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 14, 11, 13, 15, 17, 14, 16, 18, 21],
                color: "#49A078",
            },
            coralData: {
                name: data.red1,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [17, 14, 16, 18, 21, 12, 14, 11, 13, 15],
                color: "#49A078",
            },
        },
        {
            teamColor: "steel_blue",
            allianceNumber: "red2",
            teamNumber: data.red2,
            coral: 21,
            algae: 22,
            ability: "ability2",
            algaeData: {
                name: data.red2,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 14, 16, 18, 21, 11, 13, 15, 17, 14],
                color: "#3581B8",
            },
            coralData: {
                name: data.red2,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [15, 17, 14, 16, 18, 21, 12, 14, 11, 13],
                color: "#3581B8",
            },
        },
        {
            teamColor: "eminence",
            allianceNumber: "red3",
            teamNumber: data.red3,
            coral: 31,
            algae: 32,
            ability: "ability3",
            algaeData: {
                name: data.red3,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 15, 17, 14, 14, 16, 18, 21, 11, 13],
                color: "#6C3082",
            },
            coralData: {
                name: data.red3,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [11, 13, 15, 17, 14, 18, 21, 12, 14, 16],
                color: "#6C3082",
            },
        },
    ])
    let blueTeams: TeamAlliance[] = $state([
        {
            teamColor: "bittersweet",
            allianceNumber: "blue1",
            teamNumber: data.blue1,
            coral: 11,
            algae: 12,
            ability: "ability1",
            algaeData: {
                name: data.blue1,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 14, 11, 13, 15, 17, 14, 16, 18, 21],
                color: "#FF6663",
            },
            coralData: {
                name: data.blue1,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [17, 14, 16, 18, 21, 12, 14, 11, 13, 15],
                color: "#FF6663",
            },
        },
        {
            teamColor: "crayola_orange",
            allianceNumber: "blue2",
            teamNumber: data.blue2,
            coral: 21,
            algae: 22,
            ability: "ability2",
            algaeData: {
                name: data.blue2,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 14, 16, 18, 21, 11, 13, 15, 17, 14],
                color: "#FF8547",
            },
            coralData: {
                name: data.blue2,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [15, 17, 14, 16, 18, 21, 12, 14, 11, 13],
                color: "#FF8547",
            },
        },
        {
            teamColor: "imperial_red",
            allianceNumber: "blue3",
            teamNumber: data.blue3,
            coral: 31,
            algae: 32,
            ability: "ability3",
            algaeData: {
                name: data.blue3,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [12, 15, 17, 14, 14, 16, 18, 21, 11, 13],
                color: "#FF4848",
            },
            coralData: {
                name: data.blue3,
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                y: [11, 13, 15, 17, 14, 18, 21, 12, 14, 16],
                color: "#FF4848",
            },
        },
    ])

    import * as Dialog from "$lib/components/ui/dialog/index.js"
</script>

<div
    class="m-auto mb-2 grid h-96 w-full grid-cols-4 gap-1 border-2 border-solid border-imperial_red p-1"
>
    <div class="col-span-1 row-span-4 grid grid-rows-4 gap-1">
        <div
            class="row-span-1 w-full content-center bg-imperial_red text-center"
        >
            Team
        </div>
        <Dialog.Root>
            <Dialog.Trigger
                class="w-full bg-gunmetal text-center text-imperial_red"
                >Coral</Dialog.Trigger
            >
            <Dialog.Content
                class="size-96 border-2 border-solid border-imperial_red bg-gunmetal"
            >
                <LineChart
                    data={[
                        redTeams[0].coralData,
                        redTeams[1].coralData,
                        redTeams[2].coralData,
                    ]}
                    title={"Red Alliance Coral per Match"}
                    xLabel={"Match Number"}
                    yLabel={"Tele Points"}
                    width={"100%"}
                    height={"100%"}
                />
            </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
            <Dialog.Trigger
                class="row-span-1 w-full content-center bg-gunmetal text-center text-imperial_red"
                >Algae</Dialog.Trigger
            >
            <Dialog.Content
                class="size-96 border-2 border-solid border-imperial_red bg-gunmetal"
            >
                <LineChart
                    data={[
                        redTeams[0].algaeData,
                        redTeams[1].algaeData,
                        redTeams[2].algaeData,
                    ]}
                    title={"Red Alliance Algae per Match"}
                    xLabel={"Match Number"}
                    yLabel={"Tele Points"}
                    width={"100%"}
                    height={"100%"}
                />
            </Dialog.Content>
        </Dialog.Root>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-imperial_red"
        >
            Ability
        </div>
    </div>
    {#each redTeams as team}
        <div class="col-span-1 row-span-4 grid grid-rows-4 gap-1">
            <div
                class="row-span-1 w-full content-center border-2 border-solid bg-imperial_red p-2 text-center border-{team.teamColor}"
            >
                {team.allianceNumber} - {team.teamNumber}
            </div>
            <Dialog.Root>
                <Dialog.Trigger
                    class="row-span-1 w-full content-center bg-gunmetal text-center text-{team.teamColor}"
                    >{team.coral}</Dialog.Trigger
                >
                <Dialog.Content
                    class="h-96 w-96 border-2 border-solid bg-gunmetal border-{team.teamColor}"
                >
                    <LineChart
                        data={[team.coralData]}
                        title={"Coral per Match"}
                        xLabel={"Match Number"}
                        yLabel={"Tele Points"}
                        width={"100%"}
                        height={"100%"}
                    />
                </Dialog.Content>
            </Dialog.Root>
            <Dialog.Root>
                <Dialog.Trigger
                    class="row-span-1 w-full content-center bg-gunmetal text-center text-{team.teamColor}"
                    >{team.algae}</Dialog.Trigger
                >
                <Dialog.Content
                    class="h-96 w-96 border-2 border-solid bg-gunmetal border-{team.teamColor}"
                >
                    <LineChart
                        data={[team.algaeData]}
                        title={"Algae per Match"}
                        xLabel={"Match Number"}
                        yLabel={"Tele Points"}
                        width={"100%"}
                        height={"100%"}
                    />
                </Dialog.Content>
            </Dialog.Root>
            <div
                class="row-span-1 w-full content-center bg-gunmetal text-center text-{team.teamColor}"
            >
                {team.ability}
            </div>
        </div>
    {/each}
</div>

<div
    class="m-auto mb-2 grid h-96 w-full grid-cols-4 gap-1 border-2 border-solid border-steel_blue p-1"
>
    <div class="col-span-1 row-span-4 grid grid-rows-4 gap-1">
        <div class="row-span-1 w-full content-center bg-steel_blue text-center">
            Team
        </div>
        <Dialog.Root>
            <Dialog.Trigger
                class="row-span-1 w-full content-center bg-gunmetal text-center text-steel_blue"
                >Coral</Dialog.Trigger
            >
            <Dialog.Content
                class="h-96 w-96 border-2 border-solid border-steel_blue bg-gunmetal"
            >
                <LineChart
                    data={[
                        blueTeams[0].coralData,
                        blueTeams[1].coralData,
                        blueTeams[2].coralData,
                    ]}
                    title={"Blue Alliance Coral per Match"}
                    xLabel={"Match Number"}
                    yLabel={"Tele Points"}
                    width={"100%"}
                    height={"100%"}
                />
            </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
            <Dialog.Trigger
                class="row-span-1 w-full content-center bg-gunmetal text-center text-steel_blue"
                >Algae</Dialog.Trigger
            >
            <Dialog.Content
                class="h-96 w-96 border-2 border-solid border-steel_blue bg-gunmetal"
            >
                <LineChart
                    data={[
                        blueTeams[0].algaeData,
                        blueTeams[1].algaeData,
                        blueTeams[2].algaeData,
                    ]}
                    title={"Blue Alliance Algae per Match"}
                    xLabel={"Match Number"}
                    yLabel={"Tele Points"}
                    width={"100%"}
                    height={"100%"}
                />
            </Dialog.Content>
        </Dialog.Root>
        <div
            class="row-span-1 w-full content-center bg-gunmetal text-center text-steel_blue"
        >
            Ability
        </div>
    </div>
    {#each blueTeams as team}
        <div class="col-span-1 row-span-4 grid grid-rows-4 gap-1">
            <div
                class="row-span-1 w-full content-center border-2 border-solid bg-steel_blue p-2 text-center border-{team.teamColor}"
            >
                {team.allianceNumber} - {team.teamNumber}
            </div>
            <Dialog.Root>
                <Dialog.Trigger
                    class="row-span-1 w-full content-center bg-gunmetal text-center text-{team.teamColor}"
                    >{team.coral}</Dialog.Trigger
                >
                <Dialog.Content
                    class="h-96 w-96 border-2 border-solid bg-gunmetal border-{team.teamColor}"
                >
                    <LineChart
                        data={[team.coralData]}
                        title={"Coral per Match"}
                        xLabel={"Match Number"}
                        yLabel={"Tele Points"}
                        width={"100%"}
                        height={"100%"}
                    />
                </Dialog.Content>
            </Dialog.Root>
            <Dialog.Root>
                <Dialog.Trigger
                    class="row-span-1 w-full content-center bg-gunmetal text-{team.teamColor}"
                    >{team.algae}</Dialog.Trigger
                >
                <Dialog.Content
                    class="h-96 w-96 border-2 border-solid bg-gunmetal border-{team.teamColor} text-white"
                >
                    <LineChart
                        data={[team.algaeData]}
                        title={"Algae per Match"}
                        xLabel={"Match Number"}
                        yLabel={"Tele Points"}
                        width={"100%"}
                        height={"100%"}
                    />
                </Dialog.Content>
            </Dialog.Root>
            <div
                class="row-span-1 w-full content-center bg-gunmetal text-center text-{team.teamColor}"
            >
                {team.ability}
            </div>
        </div>
    {/each}
</div>
