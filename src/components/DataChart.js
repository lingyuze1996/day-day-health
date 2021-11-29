import { Line, LineChart, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { formatDate } from "../utils/Formatter";

export function RecordLineChart(props) {
    const metrics = props.metrics

    let name
    let domainRange
    let dateTicks = []
    let metricsTicks = []
    let data = [...props.records].sort((r1, r2) => new Date(r1.timestamp).getTime() - new Date(r2.timestamp).getTime())
    let lines = []

    switch (metrics) {
        case "bp":
            name = "血压"
            domainRange = [60, 180]
            for (let i = 60; i <= 180; i += 10) metricsTicks.push(i)
            data = data.filter(d => d.bpHigh !== undefined)
            lines.push(<Line key="bpHigh" yAxisId="left" type="monotone" dataKey="bpHigh" strokeWidth={2} stroke="#ff6d00" dot={null} />)
            lines.push(<Line key="bpLow" yAxisId="left" type="monotone" dataKey="bpLow" strokeWidth={2} stroke="#5c6bc0" dot={null} />)
            break

        case "bs":
            name = "血糖"
            domainRange = [6, 12]
            for (let j = 6; j <= 12; j += 0.5) metricsTicks.push(j)
            data = data.filter(d => d.bs !== undefined)
            lines.push(<Line key="bs" yAxisId="left" type="monotone" dataKey="bs" strokeWidth={2} stroke="#ad1457" fill="#ad1457" dot={null} />)
            break
        default:
            break
    }

    if (data.length <= 1) return null

    const minTime = new Date(data[0].timestamp).getTime()
    const maxTime = new Date(data[data.length - 1].timestamp).getTime()

    data = data.map(r => ({
        ...r,
        "timestamp": new Date(r.timestamp).getTime() - minTime
    }))

    for (let t = 0; t <= maxTime - minTime; t += (maxTime - minTime) / 10) dateTicks.push(t)

    return (
        <div style={{ marginBottom: "10px" }}>
            <h3 style={{ justifyContent: "center", display: "flex" }}>{`${name}走势图`}</h3>
            <div style={{ width: "100%", height: "40vh" }}>
                <ResponsiveContainer>
                    <LineChart width={3000} height={3000} data={data}>
                        <XAxis
                            type="number"
                            domain={[0, maxTime - minTime]}
                            ticks={dateTicks}
                            tickFormatter={(value) => formatDate(new Date(value + minTime))}
                            padding={{ left: 10 }}
                            dataKey="timestamp" />
                        <YAxis
                            padding={{ bottom: 10 }}
                            width={30}
                            yAxisId="left"
                            domain={domainRange}
                            ticks={metricsTicks} />
                        <Legend
                            align="center"
                            verticalAlign="top"
                            layout="horizontal"
                            iconType="line"
                            formatter={(name) => {
                                switch (name) {
                                    case "bs":
                                        return "血糖"
                                    case "bpHigh":
                                        return "收缩压"
                                    case "bpLow":
                                        return "舒张压"
                                    default:
                                        return name
                                }
                            }} />
                        <Tooltip
                            labelFormatter={(t) => formatDate(new Date(t + minTime))}
                            formatter={(value, name) => {
                                let formattedName = name
                                switch (name) {
                                    case "bs":
                                        formattedName = "血糖"
                                        break
                                    case "bpHigh":
                                        formattedName = "收缩压"
                                        break
                                    case "bpLow":
                                        formattedName = "舒张压"
                                        break
                                    default:
                                        break
                                }

                                return [value, formattedName]
                            }} />
                        {lines}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}