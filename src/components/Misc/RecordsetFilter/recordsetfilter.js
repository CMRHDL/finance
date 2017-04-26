import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import numeral from 'numeral'
import { filters } from '../../../util/recordset.util'

const props = [
  { label: 'Betrag von', field: 'filterAmountMin', filter: 'amountMin' },
  { label: 'Betrag bis', field: 'filterAmountMax', filter: 'amountMax' },
  { label: 'Beschreibung beinhaltet', field: 'filterDescription', filter: 'description' },
  { label: 'Code beinhaltet', field: 'filterCode', filter: 'code' },
]

const RecordsetFilterComponent = ({
  simpleFields,
  updateSimpleField,
  recordsetFilterAction,
}) => {
  return (
    <div style={{ padding: 25 }}>
      {props.map(({ label, field, filter }, i) => (
        <TextField
          key={i}
          floatingLabelText={label}
          value={simpleFields[field]}
          onChange={({ target: { value } }) => {
            updateSimpleField(field, value)
            if (value) {
              let val = numeral(value).value() ? numeral(value).value() : value
              recordsetFilterAction(
                'ADD_RECORDSET_FILTER',
                filters[filter](val)
              )
            } else {
              recordsetFilterAction('REMOVE_RECORDSET_FILTER', filter)
            }
          }}
        />
      ))}
      <RaisedButton
        label="Filterung leeren"
        onTouchTap={() => {
          recordsetFilterAction('RESET_RECORDSET_FILTER')
          updateSimpleField('filterAmountMin', '')
          updateSimpleField('filterAmountMax', '')
          updateSimpleField('filterDescription', '')
          updateSimpleField('filterCode', '')
        }}
      />
    </div>
  )
}

export default RecordsetFilterComponent
