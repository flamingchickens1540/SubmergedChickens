<script lang="ts">
    import LineChart from "@/components/charts/LineChart.svelte"
    import BarChart from "@/components/charts/BarChart.svelte"

    let teams: Array<{team: number, rank: string, record: string, rp: number}> = [
		{ team: 1540, rank: "rank1", record: "record1", rp: 8 },
        { team: 1844, rank: "rank2", record: "record2", rp: 2 },
		{ team: 1540, rank: "rank1", record: "record1", rp: 8 },
        { team: 1844, rank: "rank2", record: "record2", rp: 2 },
	]
    let dataOptions: Array<string> = [
        "PointsPerMatch",
        "Role",
        "CoralPerMatch",
        "OtherChart",
        "YetAnotherChart",
    ]

    let averagePoints: number = 30
    let selectedChart: string = "PointsPerMatch"
</script>
<h1 class="text-3xl text-center">Analysis</h1>
<div
    class="m-auto grid w-full h-screen grid-cols-2 grid-rows-6 gap-1 p-2"
>
    <div class="rounded border border-solid border-white p-2 col-start-1 col-span-1 row-span-2 text-center overflow-scroll">
        Teams
        {#each teams as teams}
            <div class="mb-2 rounded border border-solid border-white bg-gunmetal p-2">
                Team: {teams.team} | Rank: {teams.rank} | Record: {teams.record}
                | RP: {teams.rp}
            </div>
        {/each}
    </div>
    <div class="rounded border border-solid border-white p-2 col-start-2 col-span-1 row-span-1 row-start-1 row-span-1">
        Robor photo
    </div>
    <div class="rounded border border-solid border-white p-2 col-start-2 col-span-1 row-start-2 row-span-2 text-left content-center overflow-scroll">
        <ul>
            {#each dataOptions as dataOptions}
                <div class="mb-2 rounded border border-solid border-white bg-gunmetal p-2"><label>
                    <input type="radio" value="{dataOptions}" bind:group={selectedChart}>
                    {dataOptions}
                </label></div>
            {/each}
        </ul>
    </div>
    <div class="rounded border border-solid border-white p-2 col-start-1 row-start-3 row-span-1 text-center content-center">
        Average Points
        <p class="text-3xl">{averagePoints}</p>
    </div>
    <div class="rounded border border-solid border-white p-2 col-start-1 col-span-2 row-span-3">
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
    </div>
</div>
