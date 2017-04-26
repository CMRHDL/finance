import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { shortDate } from '../../util'

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

const Details = ({ recordset }) => {
  let sum = 0
  const data = recordset.map(e => ({
    date: shortDate(e.date),
    amount: (sum += e.amount),
  }))
  return (
    <div style={{ padding: 25, ...center }}>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
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

export default Details
