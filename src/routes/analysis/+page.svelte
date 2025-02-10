<script lang="ts">
    import LineChart from "@/components/charts/LineChart.svelte"

    let teams: Array<{team: number, rank: string, record: string, rp: number}> = [
		{ team: 1540, rank: "rank1", record: "record1", rp: 8 },
        { team: 1844, rank: "rank2", record: "record2", rp: 2 }
	]

    let averagePoints: number = 30
</script>
<div
    class="m-auto grid w-full h-96 grid-cols-2 grid-rows-4 gap-1 p-2 sm:grid-cols-3 sm:grid-rows-3 sm:gap-4 md:grid-cols-5"
>
    <div class="rounded border border-solid border-white p-2 col-start-1 row-span-4 text-center">
        Teams
        {#each teams as teams}
            <div class="bg-gunmetal rounded border border-solid border-white p-2 mb-2">
                Team: {teams.team} | Rank: {teams.rank} | Record: {teams.record} | RP: {teams.rp}
            </div>
        {/each}
    </div>
    <div class="rounded border border-solid border-white p-2 col-start-2 col-span-2 row-span-2">
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
    <div class="rounded border border-solid border-white p-2 col-start-2 row-start-3 row-span-2 text-center content-center">
        Average Points
        <p class="text-3xl">{averagePoints}</p>

    </div>
    <div class="rounded border border-solid border-white p-2 col-start-3 row-start-3 row-span-2">
        Robot photo
    </div>
    <div class="rounded border border-solid border-white p-2 col-start-4 row-span-4">
        "choose data"
        
    </div>
</div>
