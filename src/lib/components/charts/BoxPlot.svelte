<!--
@component
    A simple yet highly configurable Box Plot

    Usage:
        ```svelte
<BoxPlot
    data={[
        { name: "1844", values: [10, 12, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 20, 24, 25, 27, 30, 32], color: "#9440cf" },
        { name: "1540", values: [8, 10, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 18, 19, 20, 22, 23, 25], color: "#fbd50b" },
    ]}
    title={"Match Points Breakdown"}
    xLabel={"Team Number"}
    yLabel={"Points"}
    width={"500px"}
    height={"400px"}
/>
-->

<script lang="ts">
    import { onMount } from "svelte"
    import * as echarts from "echarts"

    type BoxPlotScatterProps = {
        data: { name: string; values: number[]; color?: string }[]
        title?: string
        xLabel?: string
        yLabel?: string
        showScatter?: boolean
        tooltip?: boolean
        width?: string
        height?: string
    }

    let {
        data,
        title = "",
        xLabel = "",
        yLabel = "",
        showScatter = true,
        tooltip = true,
        width = "600px",
        height = "400px",
    }: BoxPlotScatterProps = $props()

    let chartDom: HTMLDivElement

    onMount(() => {
        const chartInstance = echarts.init(chartDom)

        const boxPlotData = data.map(item => {
            const sorted = [...item.values].sort((a, b) => a - b)
            const min = sorted[0]
            const max = sorted[sorted.length - 1]
            const q1 = sorted[Math.floor(sorted.length / 4)]
            const median = sorted[Math.floor(sorted.length / 2)]
            const q3 = sorted[Math.floor((sorted.length * 3) / 4)]
            return {
                value: [min, q1, median, q3, max],
                itemStyle: {
                    borderColor: item.color || undefined,
                },
            }
        })

        const scatterData = data.flatMap((item, idx) =>
            item.values.map(value => ({
                value: [idx, value],
                itemStyle: {
                    color: item.color || undefined,
                    opacity: 0.5,
                },
            }))
        )

        const option = {
            title: {
                text: title,
                left: "center",
            },
            tooltip: {
                show: tooltip,
                trigger: "item",
                axisPointer: {
                    type: "shadow",
                },
                formatter: (params: any) => {
                    if (params.seriesType === "boxplot") {
                        return `
                            ${params.name}<br/>
                            Min: ${params.value[1]}<br/>
                            Q1: ${params.value[2]}<br/>
                            Median: ${params.value[3]}<br/>
                            Q3: ${params.value[4]}<br/>
                            Max: ${params.value[5]}
                        `
                    } else if (params.seriesType === "scatter") {
                        return `
                            ${data[params.value[0]].name}<br/>
                            Value: <b>${params.value[1]}</b>
                        `
                    }
                },
            },
            xAxis: {
                type: "category",
                data: data.map(item => item.name),
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
                ...(showScatter
                    ? [
                          {
                              name: "Scatter",
                              type: "scatter",
                              data: scatterData,
                              z: 2,
                              symbolSize: 6,
                          },
                      ]
                    : []),
                {
                    name: "Boxplot",
                    type: "boxplot",
                    data: boxPlotData,
                    z: 1,
                    animation: false,
                    tooltip: {
                        formatter: (param: any) => {
                            return `
                                ${param.name}<br/>
                                Min: ${param.value[1]}<br/>
                                Q1: ${param.value[2]}<br/>
                                Median: ${param.value[3]}<br/>
                                Q3: ${param.value[4]}<br/>
                                Max: ${param.value[5]}
                            `
                        },
                    },
                },
            ],
            animation: false,
        }

        chartInstance.setOption(option)
    })
</script>

<div bind:this={chartDom} style="width: {width}; height: {height};"></div>
