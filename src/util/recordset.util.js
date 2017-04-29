import orderBy from 'lodash/orderBy'
import flow from 'lodash/flow'
import get from 'lodash/get'
import { shortDate, currency } from './index'
import { recordsetColumns } from '../models'

export const attributionId = recordset => ({
  ...recordset,
  attribution: recordset.attribution._id,
})

export const amount = recordset => {
  return {
    ...recordset,
    amount: recordset.attribution.isIncome
      ? recordset.amount
      : recordset.amount * -1,
  }
}

export const filters = {
  amountMax: amountMax => ({
    func: recordset => recordset.filter(e => e.amount < amountMax),
    id: 'amountMax',
  }),
  amountMin: amountMin => ({
    func: recordset => recordset.filter(e => e.amount > amountMin),
    id: 'amountMin',
  }),
  // dateMin: dateMin => ({
  //   func: recordset => recordset.filter(e => e.date > dateMin),
  //   id: 'dateMin',
  // }),
  // dateMax: dateMax => ({
  //   func: recordset => recordset.filter(e => e.date > dateMax),
  //   id: 'dateMax',
  // }),
  description: description => ({
    func: recordset =>
      recordset.filter(e => e.description.indexOf(description) > -1),
    id: 'description',
  }),
  code: code => ({
    func: recordset => recordset.filter(e => (e.code + '').indexOf(code) > -1),
    id: 'code',
  }),
}

export const adjustRecordset = ({
  recordset,
  recordsetFilter = [],
  recordsetOrderColumn: column,
  recordsetOrderOrder: order,
}) => {
  return orderBy(
    flow(recordsetFilter.map(e => e.func))(recordset),
    [column],
    [order]
  )
}

export const buildCsv = recordset => {
  const firstRow = recordsetColumns.map(e => `"${e.displayName}"`).join(',')
  const _recordset = recordset.map(entry =>
    recordsetColumns.map(e => `"${e.func(get(entry, e.prop))}"`).join(',')
  )

  return [firstRow, ..._recordset].join('\n')
}
