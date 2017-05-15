import orderBy from 'lodash/orderBy'
import flow from 'lodash/flow'
import get from 'lodash/get'
import { recordsetColumns } from '../models'
import { suffix } from './index'
import numeral from 'numeral'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'
import join from 'ramda/src/join'
import React from 'react'
import sortBy from 'lodash/sortBy'
import MenuItem from 'material-ui/MenuItem'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import curry from 'ramda/src/curry'
import gt from 'ramda/src/gt'
import lt from 'ramda/src/lt'
import moment from 'moment'

export const attributionId = recordset => ({
  ...recordset,
  attribution: recordset.attribution._id,
})

export const amount = recordset => {
  return {
    ...recordset,
    amount: recordset.attribution.isIncome
      ? numeral(recordset.amount).value()
      : numeral(recordset.amount).value() * -1,
  }
}

/*
export const filters = {
  amountMax: amountMax => ({
    func: recordset => recordset.filter(e => e.amount < amountMax),
    id: 'amountMax',
  }),
  amountMin: amountMin => ({
    func: recordset => recordset.filter(e => e.amount > amountMin),
    id: 'amountMin',
  }),
  description: description => ({
    func: recordset =>
      recordset.filter(e => e.description.indexOf(description) > -1),
    id: 'description',
  }),
  code: code => ({
    func: recordset => {
      return recordset.filter(e => (e.code + '').indexOf(code) > -1)
    },
    id: 'code',
  }),
  attribution: attributions => ({
    func: recordset => {
      const ids = attributions.map(e => e._id)
      return recordset.filter(e => ids.indexOf(e.attribution._id) > -1)
    },
    id: 'attribution',
  }),
}
*/

// + '' in case str is a number
const contains = (val, str) => (str + '').indexOf(val) > -1
const containsAttribution = curry((arg, recordset) =>
  recordset.filter(e => arg.map(e => e._id).indexOf(e.attribution._id) > -1)
)
const date = curry((fn, arg, recordset) =>
  recordset.filter(e => moment(e.date)[fn](moment(arg)))
)
const buildFilter = curry((prop, fn, arg, recordset) =>
  recordset.filter(e => fn(arg, e[prop]))
)

// prettier-ignore
const filterSpec = [
  { id: 'filterAmountMax',    filter: buildFilter('amount', gt) },
  { id: 'filterAmountMin',    filter: buildFilter('amount', lt) },
  { id: 'filterDescription',  filter: buildFilter('description', contains) },
  { id: 'filterCode',         filter: buildFilter('code', contains) },
  { id: 'filterAttribution',  filter: containsAttribution },
  { id: 'filterDateMax',      filter: date('isAfter') },
  { id: 'filterDateMin',      filter: date('isBefore') },
]

export const filters = (id, val) => {
  const { filter } = find(propEq('id', id), filterSpec)
  return { id, func: filter(val) }
}

export const adjustRecordset = ({
  recordset,
  recordsetFilter = [],
  simpleFields,
}) => {
  const { recordsetOrderColumn, recordsetOrderOrder } = simpleFields
  return orderBy(
    flow(recordsetFilter.map(e => e.func))(recordset),
    [recordsetOrderColumn],
    [recordsetOrderOrder]
  )
}

const getDisplayname = map(e => `"${e.displayName}"`)
const joinComma = join(',')

export const buildCsv = recordset => {
  // const firstRow = recordsetColumns.map(e => `"${e.displayName}"`).join(',')

  const firstRow = pipe(getDisplayname, joinComma)(recordsetColumns)

  const _recordset = recordset.map(entry =>
    recordsetColumns.map(e => `"${e.display(get(entry, e.prop))}"`).join(',')
  )

  return [firstRow, ..._recordset].join('\n')
}

export const createDatasource = arr =>
  sortBy(
    arr.map(a => ({
      text: a.attribution + suffix(a.isIncome),
      value: (
        <MenuItem
          primaryText={a.attribution}
          secondaryText={suffix(a.isIncome)}
        />
      ),
      attribution: a,
      isIncome: a.isIncome,
    })),
    ['isIncome', 'text']
  )
