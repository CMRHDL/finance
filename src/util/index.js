import moment from 'moment'
import numeral from 'numeral'
import 'numeral/locales/de'
numeral.locale('de')

import padStart from 'lodash/padStart'

export const bind = (func, ...args) => func.bind(null, ...args)
export const currency = number => numeral(number).format('0,0.00 $')
export const shortDate = date => moment(date).format('L')
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
