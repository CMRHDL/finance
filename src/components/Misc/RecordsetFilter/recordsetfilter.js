import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import numeral from 'numeral'
import { filters } from '../../../util/recordset.util'

const props = [
  { label: 'Betrag von', field: 'filterAmountMin', id: 'amountMin' },
  { label: 'Betrag bis', field: 'filterAmountMax', id: 'amountMax' },
  {
    label: 'Beschreibung beinhaltet',
    field: 'filterDescription',
    id: 'description',
  },
  { label: 'Code beinhaltet', field: 'filterCode', id: 'code' },
]

const center = {
  display: 'flex',
  justifyContent: 'center',
}

const RecordsetFilterComponent = ({
  simpleFields,
  updateSimpleField,
  recordsetFilterAction,
}) => {
  return (
    <div style={{ padding: 25, ...center }}>
      {props.map(({ label, field, id }, i) => (
        <TextField
          key={i}
          floatingLabelText={label}
          value={simpleFields[field]}
          onChange={({ target: { value } }) => {
            updateSimpleField(field, value)
            if (value) {
              let val = numeral(value).value() ? numeral(value).value() : value
              recordsetFilterAction('ADD_RECORDSET_FILTER', filters[id](val))
            } else {
              recordsetFilterAction('REMOVE_RECORDSET_FILTER', id)
            }
          }}
        />
      ))}
      <FlatButton
        label="Filterung leeren"
        onTouchTap={() => {
          recordsetFilterAction('RESET_RECORDSET_FILTER')
          props.forEach(({ field }) => updateSimpleField(field, ''))
        }}
      />
    </div>
  )
}

export default RecordsetFilterComponent
