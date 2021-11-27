import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatDate } from "../utils/Formatter";

export function RecordLineChart(props) {
    if (props.records.length <= 1) return null

    const dateSortedData = [...props.records].reverse()
    const minTime = new Date(dateSortedData[0].timestamp).getTime()
    const maxTime = new Date(dateSortedData[dateSortedData.length - 1].timestamp).getTime()

    const data = dateSortedData.map(r => ({
        "收缩压": r.bpHigh,
        "舒张压": r.bpLow,
        "血糖": r.bs,
        "时间": new Date(r.timestamp).getTime() - minTime
    }))

    let dateTicks = []
    let bpTicks = []
    let bsTicks = []

    for (let t = 0; t <= maxTime - minTime; t += (maxTime - minTime) / 10) dateTicks.push(t)
    for (let i = 0; i <= 160; i += 10) bpTicks.push(i)
    for (let j = 6; j <= 15; j += 0.5) bsTicks.push(j)

    if (props.records.length === 0) return null

    return (
        <LineChart width={370} height={300} data={data}>
            <XAxis
                // label={{ value: "TimeLine", position: "bottom" }}
                type="number"
                domain={[0, maxTime - minTime]}
                ticks={dateTicks}
                tickFormatter={(value) => formatDate(new Date(value + minTime))}
                padding={{ left: 10, right: 10 }}
                dataKey="时间" />
            {props.bp ?
                <YAxis
                    padding={{ bottom: 10 }}
                    width={30}
                    label={{ value: "血压", position: "insideTopRight", dx: 40 }}
                    yAxisId="left"
                    domain={[0, 160]}
                    ticks={bpTicks} />
                : ""
            }
            {props.bs ?
                <YAxis
                    padding={{ bottom: 10 }}
                    width={32}
                    label={{ value: "血糖", position: "insideTopLeft", dx: -40 }}
                    orientation="right"
                    yAxisId="right"
                    domain={[6, 15]}
                    ticks={bsTicks}
                /> : ""
            }
            <Tooltip labelFormatter={(t) => formatDate(new Date(t + minTime))} />
            {/* <Legend align="right" verticalAlign="top" layout="vertical" /> */}
            {props.bp ? <Line yAxisId="left" type="monotone" dataKey="收缩压" strokeWidth={2} stroke="#ff6d00" /> : ""}
            {props.bp ? <Line yAxisId="left" type="monotone" dataKey="舒张压" strokeWidth={2} stroke="#5c6bc0" /> : ""}
            {props.bs ? <Line yAxisId="right" type="monotone" dataKey="血糖" strokeWidth={2} stroke="#ad1457" fill="#ad1457" /> : ""}
        </LineChart>
    )
}