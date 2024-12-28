<!-- 
  @component
    An simple yet highly configurable Scatter Plot

    Usage:
    ```svelte
<ScatterPlot
    data={[
        { x: 10.0, y: 8.04, color: "#fbd50b" },
        { x: 8.07, y: 6.95, color: "#9440cf" },
        { x: 13.0, y: 7.58, color: "#ff5733" },
        { x: 11.0, y: 8.33, color: "#3357ff" },
        { x: 14.0, y: 7.66, color: "#ff33a1" },
        { x: 9.15, y: 7.26, color: "#33ffa1" },
        { x: 3.03, y: 4.23, color: "#ff5733" },
        { x: 12.2, y: 7.83, color: "#33ff57" },
        { x: 2.02, y: 4.47, color: "#3357ff" },
        { x: 1.05, y: 3.33, color: "#ff33a1" },
        { x: 6.03, y: 7.24, color: "#33a1ff" },
        { x: 7.08, y: 5.82, color: "#33ffa1" },
        { x: 5.02, y: 5.68, color: "#a1ff33" },
    ]}
    title={"Tele Points vs Auto Points"}
    xLabel={"Tele Points"}
    yLabel={"Auto Points"}
    trendline={{ model: "polynomial" }}
    width={"600px"}
    height={"400px"}
/>
-->

<script lang="ts">
    import * as echarts from "echarts"
    import ecStat from "echarts-stat"

    // @ts-ignore
    echarts.registerTransform(ecStat.transform.regression)

    type RegressionModel =
        | "linear"
        | "exponential"
        | "logarithmic"
        | "polynomial"

    type ScatterLineProps = {
        data: { name?: string; x: number; y: number; color?: string }[] //TODO: add name
        title?: string
        xLabel?: string
        yLabel?: string
        trendline?: { model: RegressionModel; color?: string }
        tooltip?: boolean
        width?: string
        height?: string
    }

    let {
        data,
        title = "",
        xLabel = "",
        yLabel = "",
        trendline = undefined,
        tooltip = true,
        width = "600px",
        height = "400px",
    }: ScatterLineProps = $props()

    let chartDom: HTMLDivElement

    $effect(() => {
        if (chartDom) {
            const chart = echarts.init(chartDom)

            const option = {
                title: {
                    text: title,
                    left: "center",
                },
                xAxis: {
                    type: "value",
                    name: xLabel,
                    nameLocation: "middle",
                    nameGap: 30,
                },
                yAxis: {
                    type: "value",
                    name: yLabel,
                    nameLocation: "middle",
                    nameGap: 30,
                },
                series: [
                    {
                        data: data.map(item => [item.x, item.y]),
                        type: "scatter",
                        symbolSize: 7,
                        itemStyle: {
                            color: (params: any) =>
                                data[params.dataIndex].color ?? {},
                        },
                    },
                ],
                tooltip: {
                    show: tooltip,
                    formatter: (params: any) => {
                        const name = data[params.dataIndex].name
                            ? `${data[params.dataIndex].name}<br>`
                            : ""
                        return `${name} ${yLabel}: <b>${params.value[1]}</b><br>${xLabel}: <b>${params.value[0]}</b>`
                    },
                },
                animation: false,
            }

            if (trendline) {
                // @ts-expect-error
                option.dataset = [
                    {
                        source: data.map(d => [d.x, d.y]),
                    },
                    {
                        transform: {
                            type: "ecStat:regression",
                            config: {
                                method: trendline.model,
                            },
                        },
                    },
                ]
                option.series.push({
                    // @ts-ignore
                    name: "line",
                    type: "line",
                    smooth: true,
                    datasetIndex: 1,
                    symbolSize: 0.1,
                    silent: true,
                    symbol: "circle",
                    lineStyle: {
                        type: "dashed",
                        color: trendline.color ?? "#CCCCCC",
                    },
                    z: 1,
                })
            }

            chart.setOption(option)
        }
    })
</script>

<div bind:this={chartDom} style="width: {width}; height: {height}"></div>
