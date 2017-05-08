import React from 'react'
import filter from 'ramda/src/filter'
import map from 'ramda/src/map'
import sum from 'ramda/src/sum'
import pipe from 'ramda/src/pipe'
import uniq from 'ramda/src/uniq'
import sort from 'ramda/src/sort'
import gt from 'ramda/src/gt'
import lt from 'ramda/src/lt'

import { shortDate } from '../../../util'

import { lightGreen300, orange300 } from 'material-ui/styles/colors'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const center = {
  display: 'flex',
  justifyContent: 'center',
}

const isPositive = filter(lt(0))
const isNegative = filter(gt(0))
const toPositive = map(e => e * -1)
const toAmount = map(e => e.amount)
const toShortDate = e => shortDate(e.date).substring(3)
const getShortDate = map(toShortDate)
const isMonth = month => filter(e => toShortDate(e) === month)
const getIncome = (recordset, ...filters) =>
  pipe(...filters, toAmount, isPositive, sum)(recordset)
const getExpense = (recordset, ...filters) =>
  pipe(...filters, toAmount, isNegative, toPositive, sum)(recordset)
const createMonthList = recordset =>
  map(e => ({
    name: e,
    income: getIncome(recordset, isMonth(e)),
    expense: getExpense(recordset, isMonth(e)),
  }))

const SimpleBar = ({ recordset, chartStyle }) => {
  const income = getIncome(recordset)
  const expense = getExpense(recordset)

  const months = pipe(getShortDate, uniq, sort(gt), createMonthList(recordset))(
    recordset
  )

  const data = [{ name: 'Total', income, expense }, ...months]

  return (
    <div style={{ padding: 25, ...center }}>
      <BarChart data={data} {...chartStyle}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" name="Einnahmen" fill={lightGreen300} />
        <Bar dataKey="expense" name="Ausgaben" fill={orange300} />
      </BarChart>
    </div>
  )
}

export default SimpleBar
