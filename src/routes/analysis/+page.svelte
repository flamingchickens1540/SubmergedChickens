<script>
    import LineChart from "@/components/charts/LineChart.svelte"
    import BarChart from "@/components/charts/BarChart.svelte"
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