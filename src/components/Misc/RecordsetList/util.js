import { lightGreen100, orange100 } from 'material-ui/styles/colors'

export const setOrder = (prop, { simpleFields, updateSimpleField }) => {
  const { recordsetOrderColumn, recordsetOrderOrder } = simpleFields
  if (recordsetOrderColumn === prop) {
    const order = recordsetOrderOrder === 'asc' ? 'desc' : 'asc'
    updateSimpleField('recordsetOrderOrder', order)
  } else {
    updateSimpleField('recordsetOrderOrder', 'asc')
    updateSimpleField('recordsetOrderColumn', prop)
  }
}

export const getColor = ({ attribution: { isIncome } }) =>
  isIncome ? lightGreen100 : orange100

export const getOrderInfo = (
  prop,
  {
    simpleFields: { recordsetOrderColumn },
    simpleFields: { recordsetOrderOrder },
  }
) => {
  return (
    recordsetOrderColumn === prop &&
    `(${recordsetOrderOrder === 'asc' ? 'auf' : 'ab'})`
  )
}
