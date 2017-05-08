import React from 'react'
import { shortDate } from '../../../util'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const CustomizedAxisTick = ({ x, y, stroke, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      textAnchor="end"
      fill="#666"
      transform="rotate(-35)"
    >
      {payload.value}
    </text>
  </g>
)

const center = {
  display: 'flex',
  justifyContent: 'center',
}

const SimpleLine = ({ recordset, chartStyle }) => {
  let sum = 0
  const data = recordset.map(e => ({
    date: shortDate(e.date),
    amount: (sum += e.amount),
  }))
  return (
    <div style={{ padding: 25, ...center }}>
      <LineChart data={data} {...chartStyle}>
        <XAxis dataKey="date" height={70} tick={<CustomizedAxisTick />} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          name="Kontostand"
        />
      </LineChart>
    </div>
  )
}

export default SimpleLine
