import numeral from 'numeral'
import { filters } from '../../../util/recordset.util'
import curryN from 'ramda/src/curryN'

export const updateFilter = curryN(
  3,
  ({ updateSimpleField, recordsetFilterAction }, field, value) => {
    updateSimpleField(field, value)
    if (isValid(value)) {
      // parse number from value for amount-filter, if parseable
      const val = numeral(value).value() ? numeral(value).value() : value
      recordsetFilterAction('ADD_RECORDSET_FILTER', filters(field, val))
    } else {
      recordsetFilterAction('REMOVE_RECORDSET_FILTER', field)
    }
  }
)

function isValid(value) {
  // String !== '' or Date or Not-Empty-Array
  return value && (value.getMonth || value.length)
}
