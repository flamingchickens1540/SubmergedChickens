<script lang="ts">
    import LineChart from "@/components/charts/LineChart.svelte"
    import type { GraphData } from "./+page.server"
    import type { PageProps } from "./$types"

    const { data }: PageProps = $props()
    const teams_data = data.processed_team_events

    let teams: Array<{
        team: number
        graph_data: GraphData
        rank?: number
        record?: string
        rp?: number
    }> = teams_data.map(team_data => {
        return {
            team: team_data.key,
            rank: team_data.rank,
            record: team_data.record,
            rp: team_data.rp,
            graph_data: team_data.graph_data,
        }
    })

    let curr_team_index = $state(0)

    let team_data = $derived(teams_data[curr_team_index])

    const curr_coral_ratio = $derived({
        name: team_data.key.toString(),
        y: team_data.graph_data.coral_ratio,
        x: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })
    const curr_coral_scored = $derived({
        name: team_data.key.toString(),
        y: team_data.graph_data.coral_scored,
        x: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })
    const curr_algae_ratio = $derived({
        name: team_data.key.toString(),
        y: team_data.graph_data.algae_ratio,
        x: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })
    const curr_algae_scored = $derived({
        name: team_data.key.toString(),
        y: team_data.graph_data.algae_scored,
        x: team_data.graph_data.match_numbers,
        color: "#fbd50b",
    })

    let dataOptions = [
        "CoralRatio",
        "CoralPerMatch",
        "AlgaePerMatch",
        "AlgaeRatio",
    ]

    let selectedChart: string = $state("PointsPerMatch")
</script>

<h1 class="text-center text-3xl">Analysis</h1>
<div class="m-auto grid h-screen w-full grid-cols-2 grid-rows-6 gap-1 p-2">
    <div
        class="col-span-1 col-start-1 row-span-2 grid grid-rows-1 overflow-y-scroll rounded border border-solid border-white p-2 text-center"
    >
        <div>Teams</div>
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
        {#if selectedChart.includes("Coral")}
            Average Coral
            <p class="text-3xl">{team_data.average_coral}</p>
        {:else}
            Average Algae
            <p class="text-3xl">{team_data.average_algae}</p>
        {/if}
    </div>
    <div
        class="col-span-2 col-start-1 row-span-3 rounded border border-solid border-white p-2"
    >
        {#if selectedChart === "CoralPerMatch"}
            <LineChart
                data={[curr_coral_scored]}
                title={"Coral Scored vs Match Number"}
                xLabel={"Match Number"}
                yLabel={"Coral Scored"}
                width={"100%"}
                height={"100%"}
            />
        {:else if selectedChart === "CoralRatio"}
            <LineChart
                data={[curr_coral_ratio]}
                title={"Coral Success Ratio vs Match Number"}
                xLabel={"Match Number"}
                yLabel={"Coral Success Ratio"}
                width={"100%"}
                height={"100%"}
            />
        {:else if selectedChart === "AlgaePerMatch"}
            <LineChart
                data={[curr_algae_scored]}
                title={"Algae Scored vs Match Number"}
                xLabel={"Match Number"}
                yLabel={"Algae Scored"}
                width={"100%"}
                height={"100%"}
            />
        {:else if selectedChart === "AlgaeRatio"}
            <LineChart
                data={[curr_algae_ratio]}
                title={"Algae Success Ratio vs Match Number"}
                xLabel={"Match Number"}
                yLabel={"Algae Succes Ratio"}
                width={"100%"}
                height={"100%"}
            />
        {/if}
    </div>
</div>
