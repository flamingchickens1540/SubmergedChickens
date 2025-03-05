<!-- 
  @component
    An simple yet highly configurable Line Chart

    Usage:
    ```svelte
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
--->

<script lang="ts">
    import * as echarts from "echarts"

    type LineChartProps = {
        data: { name: string; x: number[]; y: number[]; color?: string }[]
        title?: string
        xLabel?: string
        yLabel?: string
        width?: string
        height?: string
    }

    let {
        data,
        title,
        xLabel,
        yLabel,
        width = "600px",
        height = "400px",
    }: LineChartProps = $props()

    let chartDom: HTMLDivElement

    $effect(() => {
        if (chartDom) {
            const chart = echarts.init(chartDom)
            const option = {
                title: {
                    text: title,
                    left: "center",
                    textStyle: {
                        color: "rgba(255, 255, 255, 1)",
                    },
                },
                legend: {
                    data: data.map(d => d.name),
                    top: 20,
                    textStyle: {
                        color: "rgba(255, 255, 255, 1)",
                    },
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
                series: [],
                tooltip: {
                    formatter: (params: any) => {
                        return `${params.seriesName}<br> ${yLabel}: <b>${params.value[1]}</b><br> ${xLabel}: <b>${params.value[0]}</b>`
                    },
                },
                animation: false,
            }

            data.forEach(series => {
                // @ts-expect-error
                option.series.push({
                    type: "line",
                    data: series.x.map((x, i) => [x, series.y[i]]),
                    name: series.name,
                    itemStyle: series.color ? { color: series.color } : {},
                })
            })

            chart.setOption(option)
        }
    })
</script>

<div bind:this={chartDom} style="width: {width}; height: {height};"></div>
