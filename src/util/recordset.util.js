import orderBy from 'lodash/orderBy'
import flow from 'lodash/flow'
import get from 'lodash/get'
import { recordsetColumns } from '../models'
import numeral from 'numeral'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'
import join from 'ramda/src/join'

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
