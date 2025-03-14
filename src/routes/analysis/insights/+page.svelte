<script lang="ts">
    import LineChart from "@/components/charts/LineChart.svelte"
    import BarChart from "@/components/charts/BarChart.svelte"
    import type { GraphData } from "./+page.server"
    import type { PageProps } from "./$types"

    const { data }: PageProps = $props()
    const teams_data = data.processed_team_events

    let teams: Array<{
        team: number
        rank: string
        record: string
        rp: number
        graph_data: GraphData
    }> = teams_data.map(team_data => {
        return {
            team: team_data.key,
            rank: "rank1",
            record: "record1",
            rp: 8,
            graph_data: team_data.graph_data,
        }
    })
    const coral_1540 = {
        name: "1540",
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [12, 14, 11, 13, 15, 17, 14, 16, 18, 21],
        color: "#fbd50b",
    }

    let curr_team_index = $state(0)

    let team_data = $derived(teams_data[curr_team_index])

    const curr_coral_ratio = $derived({
        name: team_data.key.toString(),
        x: team_data.graph_data.coral_ratio,
        y: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })
    const curr_coral_scored = $derived({
        name: team_data.key.toString(),
        x: team_data.graph_data.coral_scored,
        y: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })
    const curr_algae_ratio = $derived({
        name: team_data.key.toString(),
        x: team_data.graph_data.algae_ratio,
        y: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })
    const curr_algae_scored = $derived({
        name: team_data.key.toString(),
        x: team_data.graph_data.algae_scored,
        y: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })

    let dataOptions = [
        "CoralRatio",
        "CoralPerMatch",
        "AlgaePerMatch",
        "AlgaeRatio",
    ]

    let averagePoints: number = 30
    let selectedChart: string = $state("PointsPerMatch")
</script>

<h1 class="text-center text-3xl">Analysis</h1>
<div class="m-auto grid h-screen w-full grid-cols-2 grid-rows-6 gap-1 p-2">
    <div
        class="col-span-1 col-start-1 row-span-2 overflow-scroll rounded border border-solid border-white p-2 text-center"
    >
        Teams
        {#each teams as team, i}
            <button
                class="mb-2 rounded border border-solid border-white bg-gunmetal p-2"
                onclick={() => (curr_team_index = i)}
            >
                Team: {team.team} | Rank: {team.rank} | Record: {team.record}
                | RP: {team.rp}
            </button>
        {/each}
    </div>
    <div
        class="col-span-1 col-start-2 row-span-1 row-start-1 rounded border border-solid border-white p-2"
    >
        Robot photo!?!
    </div>
    <div
        class="col-span-1 col-start-2 row-span-2 row-start-2 content-center overflow-scroll rounded border border-solid border-white p-2 text-left"
    >
        <ul>
            {#each dataOptions as dataOptions}
                <div
                    class="mb-2 rounded border border-solid border-white bg-gunmetal p-2"
                >
                    <label>
                        <input
                            type="radio"
                            value={dataOptions}
                            bind:group={selectedChart}
                        />
                        {dataOptions}
                    </label>
                </div>
            {/each}
        </ul>
    </div>
    <div
        class="col-start-1 row-span-1 row-start-3 content-center rounded border border-solid border-white p-2 text-center"
    >
        Average Points
        <p class="text-3xl">{averagePoints}</p>
    </div>
    <div
        class="col-span-2 col-start-1 row-span-3 rounded border border-solid border-white p-2"
    >
        {#if selectedChart === "CoralPerMatch"}
            <LineChart
                data={[curr_coral_scored]}
                title={"Tele Points vs Match Number"}
                xLabel={"Match Number"}
                yLabel={"Tele Points"}
                width={"100%"}
                height={"100%"}
            />
        {:else if selectedChart === "BarChart"}
            <BarChart
                data={[
                    {
                        name: "1540",
                        values: [12, 18, 9],
                    },
                    {
                        name: "1844",
                        values: [22, 10, 15],
                    },
                ]}
                categories={["Auto", "Tele", "End"]}
                title={"BarChart"}
                xLabel={"Team Number"}
                yLabel={"Role"}
                width={"100%"}
                height={"100%"}
            />
        {:else if selectedChart === "AlgaePerMatch"}
            <LineChart
                data={[curr_coral_scored]}
                title={"CoralPerMatch"}
                xLabel={"Match Number"}
                yLabel={"Coral"}
                width={"100%"}
                height={"100%"}
            />
        {/if}
    </div>
</div>
