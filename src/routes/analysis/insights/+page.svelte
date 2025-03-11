<script lang="ts">
    import LineChart from "@/components/charts/LineChart.svelte"
    import BarChart from "@/components/charts/BarChart.svelte"

    let teams: Array<{
        team: number
        rank: string
        record: string
        rp: number
    }> = [
        { team: 1540, rank: "rank1", record: "record1", rp: 8 },
        { team: 1844, rank: "rank2", record: "record2", rp: 2 },
        { team: 1540, rank: "rank1", record: "record1", rp: 8 },
        { team: 1844, rank: "rank2", record: "record2", rp: 2 },
    ]
    let dataOptions: Array<string> = [
        "PointsPerMatch",
        "BarChart",
        "CoralPerMatch",
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
        {#each teams as teams}
            <div
                class="mb-2 rounded border border-solid border-white bg-gunmetal p-2"
            >
                Team: {teams.team} | Rank: {teams.rank} | Record: {teams.record}
                | RP: {teams.rp}
            </div>
        {/each}
    </div>
    <div
        class="col-span-1 col-start-2 row-span-1 row-start-1 rounded border border-solid border-white p-2"
    >
        Robor photo
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
        {#if selectedChart === "PointsPerMatch"}
            <LineChart
                data={[
                    {
                        name: "1540",
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: [12, 14, 11, 13, 15, 17, 14, 16, 18, 21],
                        color: "#fbd50b",
                    },
                    {
                        name: "1844",
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: [15, 20, 14, 19, 18, 23, 21, 22, 24, 25],
                        color: "#9440cf",
                    },
                ]}
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
        {:else if selectedChart === "CoralPerMatch"}
            <LineChart
                data={[
                    {
                        name: "team3",
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: [12, 14, 5, 8, 19, 10, 20, 17, 9, 21],
                        color: "#ff0000",
                    },
                    {
                        name: "team4",
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: [6, 11, 14, 10, 13, 7, 5, 18, 13, 24],
                        color: "#0000ff",
                    },
                ]}
                title={"CoralPerMatch"}
                xLabel={"Match Number"}
                yLabel={"Coral"}
                width={"100%"}
                height={"100%"}
            />
        {/if}
    </div>
</div>
