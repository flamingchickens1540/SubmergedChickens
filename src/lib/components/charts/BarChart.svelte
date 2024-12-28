<!--
@component
    A simple yet highly configurable Bar Chart

    Usage:
        ```svelte
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
-->

<script lang="ts">
    import * as echarts from "echarts"

    type BarChartProps = {
        data: { name: string; values: number[]; sortBy?: number }[]
        categories: string[]
        title?: string
        xLabel?: string
        yLabel?: string
        sort?: "asc" | "desc" | "none"
        normalize?: boolean
        barColors?: string[]
        barLabels?: boolean
        tooltip?: boolean
        width?: string
        height?: string
    }

    let {
        data,
        categories,
        title = "",
        xLabel = "",
        yLabel = "",
        sort = "desc",
        normalize = false,
        barColors = undefined,
        barLabels = true,
        tooltip = true,
        width = "600px",
        height = "400px",
    }: BarChartProps = $props()

    let chartDom: HTMLDivElement

    $effect(() => {
        if (chartDom) {
            const myChart = echarts.init(chartDom)

            if (normalize) {
                data.forEach(item => {
                    const total = item.values.reduce((sum, val) => sum + val, 0)
                    item.values = item.values.map(val =>
                        parseFloat(((val / total) * 100).toFixed(2))
                    )
                })
            }

            if (sort !== "none") {
                data.sort((a, b) => {
                    const sortDirection = sort === "asc" ? 1 : -1
                    const aSort =
                        a.sortBy !== undefined
                            ? a.sortBy
                            : a.values.reduce((sum, val) => sum + val, 0)
                    const bSort =
                        b.sortBy !== undefined
                            ? b.sortBy
                            : b.values.reduce((sum, val) => sum + val, 0)
                    return (aSort - bSort) * sortDirection
                })
            }

            const option = {
                title: {
                    text: title,
                    left: "center",
                },
                legend: {
                    data: categories,
                    top: 20,
                },
                xAxis: {
                    type: "category",
                    name: xLabel,
                    nameLocation: "middle",
                    nameGap: 30,
                    data: data.map(item => item.name),
                },
                yAxis: {
                    type: "value",
                    name: yLabel,
                    nameLocation: "middle",
                    nameGap: 30,
                    axisLabel: {
                        formatter: (value: number) =>
                            normalize ? `${value}%` : value,
                    },
                },
                series: data[0].values
                    .map((_, stackIndex) => ({
                        name: categories[stackIndex],
                        type: "bar",
                        stack: "total",
                        data: data.map(item => item.values[stackIndex]),
                        itemStyle: barColors
                            ? {
                                  color: barColors[
                                      stackIndex % barColors.length
                                  ],
                              }
                            : {},
                        label: {
                            show: barLabels,
                            formatter: (params: any) =>
                                normalize ? `${params.value}%` : params.value,
                        },
                        emphasis: {
                            focus: "series",
                        },
                    }))
                    .reverse(),
                tooltip: {
                    show: tooltip,
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                    formatter: (params: any) => {
                        let total = 0
                        let tooltipText = `${params[0].name}<br/>`

                        // @ts-ignore
                        params.forEach(param => {
                            total += param.value
                        })

                        if (!normalize && params.length > 1)
                            tooltipText += `Total: <b>${total}</b><br/>`

                        // @ts-ignore
                        params.reverse().forEach(param => {
                            tooltipText += `${param.marker} ${param.seriesName}: <b>${param.value}${normalize ? "%" : ""}</b><br/>`
                        })

                        return tooltipText
                    },
                },
                animation: false,
            }

            myChart.setOption(option)
        }
    })
</script>

<div bind:this={chartDom} style="width: {width}; height: {height};"></div>
