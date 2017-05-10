import filter from 'ramda/src/filter'
import gt from 'ramda/src/gt'
import lt from 'ramda/src/lt'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'
import React from 'react'
import sort from 'ramda/src/sort'
import sum from 'ramda/src/sum'
import uniq from 'ramda/src/uniq'

import { shortDate } from '../../../util'

import { lightGreen100, orange100 } from 'material-ui/styles/colors'

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
        <Bar dataKey="income" name="Einnahmen" fill={lightGreen100} />
        <Bar dataKey="expense" name="Ausgaben" fill={orange100} />
      </BarChart>
    </div>
  )
}

export default SimpleBar
