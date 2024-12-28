<script lang="ts">
    import BarChart from "$lib/components/charts/BarChart.svelte"
    import BoxPlot from "$lib/components/charts/BoxPlot.svelte"
    import LineChart from "$lib/components/charts/LineChart.svelte"
    import RadarChart from "$lib/components/charts/RadarChart.svelte"
    import ScatterPlot from "$lib/components/charts/ScatterPlot.svelte"
</script>

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
    title={"Total Points"}
    xLabel={"Team Number"}
    yLabel={"Points"}
    width={"600px"}
    height={"400px"}
/>

<BarChart
    data={[
        {
            name: "1540",
            values: [12, 30],
            sortBy: 12 / 30,
        },
        {
            name: "1844",
            values: [7, 38],
            sortBy: 7 / 38,
        },
    ]}
    categories={["Shots Missed", "Shots Made"]}
    barColors={["#cd1c18", "#89f336"]}
    sort={"asc"}
    normalize={true}
    title={"Speaker Shots"}
    xLabel={"Team Number"}
    yLabel={"Points"}
    width={"600px"}
    height={"400px"}
/>

<BoxPlot
    data={[
        {
            name: "1844",
            values: [
                10, 12, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 20, 24,
                25, 27, 30, 32,
            ],
            color: "#9440cf",
        },
        {
            name: "1540",
            values: [
                8, 10, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 18, 19,
                20, 22, 23, 25,
            ],
            color: "#fbd50b",
        },
    ]}
    title={"Match Points Breakdown"}
    xLabel={"Team Number"}
    yLabel={"Points"}
    width={"600px"}
    height={"400px"}
/>

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
    width={"600px"}
    height={"400px"}
/>

<RadarChart
    data={[
        {
            name: "1540",
            values: [13, 28, 6, 50],
            color: "#fbd50b",
        },
        {
            name: "1844",
            values: [37, 83, 6, 15],
            color: "#9440cf",
        },
    ]}
    categories={[
        { name: "amp" },
        { name: "speaker" },
        { name: "trap" },
        { name: "pass" },
    ]}
    title={"Successful Actions Taken"}
    width={"600px"}
    height={"525px"}
/>

<ScatterPlot
    data={[
        { name: "1540", x: 10.0, y: 8.04, color: "#fbd50b" },
        { name: "1844", x: 8.07, y: 6.95, color: "#9440cf" },
        { name: "254", x: 13.0, y: 7.58, color: "#0070ff" },
        { name: "1678", x: 11.0, y: 8.33, color: "#3cd52e" },
        { name: "118", x: 14.0, y: 7.66, color: "#f1af1c" },
        { name: "148", x: 9.15, y: 7.26, color: "#000000" },
        { name: "4414", x: 3.03, y: 4.23, color: "#00b6ae" },
        { name: "1114", x: 12.2, y: 7.83, color: "#b4150b" },
        { name: "2056", x: 2.02, y: 4.47, color: "#ea1f29" },
        { name: "1690", x: 1.05, y: 3.33, color: "#0100fc" },
        { name: "6328", x: 6.03, y: 7.24, color: "#446ce3" },
        { name: "4481", x: 7.08, y: 5.82, color: "#ff6600" },
        { name: "581", x: 5.02, y: 5.68, color: "#e86d38" },
    ]}
    title={"Tele Points vs Auto Points"}
    xLabel={"Tele Points"}
    yLabel={"Auto Points"}
    trendline={{ model: "linear" }}
    width={"600px"}
    height={"400px"}
/>
