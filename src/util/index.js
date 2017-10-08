import moment from 'moment'
import numeral from 'numeral'
import 'numeral/locales/de'

numeral.register('locale', 'dede', {
  delimiters: {
    thousands: '',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: function(number) {
    return '.'
  },
  currency: {
    symbol: '€',
  },
})

numeral.locale('dede')

import padStart from 'lodash/padStart'

export const bind = (func, ...args) => func.bind(null, ...args)
export const currency = number => numeral(number).format('0,0.00 $')
export const shortDate = date => moment(date).format('L')
export const abs = r => ({
  ...r,
  amount: r.amount >= 0 ? r.amount : r.amount * -1,
})
export const toDate = r => ({
  ...r,
  date: new Date(r.date),
})
export const generateCode = ({ number, page, position, year }) =>
  year +
  padStart(number, 3, '0') +
  padStart(page, 2, '0') +
  padStart(position, 2, '0')
export const parseCode = code => {
  const [, year, number, page, position] = /(\d{4})(\d{3})(\d{2})(\d{2})/g
    .exec(code)
    .map(e => numeral(e).value())
  return { year, number, page, position }
}

export const suffix = isIncome => (isIncome ? ' (E)' : ' (A)')
