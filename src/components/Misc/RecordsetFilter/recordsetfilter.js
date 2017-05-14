import AutoComplete from 'material-ui/AutoComplete'
import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import numeral from 'numeral'
import { filters, createDatasource } from '../../../util/recordset.util'
import { suffix } from '../../../util'

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

const border = {
  borderColor: 'green',
  borderStyle: 'solid',
  borderWidth: 2,
  padding: 5,
}

const RecordsetFilterComponent = ({
  attributions,
  recordsetFilterAction,
  simpleFields,
  updateSimpleField,
}) => {
  const {
    recordsetFilterAttribution,
    recordsetFilterAttributionInput,
  } = simpleFields
  const ids = (recordsetFilterAttribution || []).map(e => e._id)
  let dataSource = createDatasource(attributions).filter(
    e => ids.indexOf(e.attribution._id) === -1
  )
  return (
    <div>
      <div style={{ padding: 25, ...center }}>
        {props.map(({ label, field, id }, i) => (
          <TextField
            key={i}
            floatingLabelText={label}
            value={simpleFields[field]}
            onChange={({ target: { value } }) => {
              updateSimpleField(field, value)
              if (value) {
                let val = numeral(value).value()
                  ? numeral(value).value()
                  : value
                recordsetFilterAction('ADD_RECORDSET_FILTER', filters(id, val))
              } else {
                recordsetFilterAction('REMOVE_RECORDSET_FILTER', id)
              }
            }}
          />
        ))}
      </div>
      <div style={{ padding: 25, ...center }}>
        <AutoComplete
          floatingLabelText="Zuordnung"
          filter={AutoComplete.fuzzyFilter}
          dataSource={dataSource}
          openOnFocus={true}
          searchText={recordsetFilterAttributionInput}
          onNewRequest={({ attribution }) => {
            const filterAttributions = [
              ...recordsetFilterAttribution,
              attribution,
            ]
            updateSimpleField('recordsetFilterAttribution', filterAttributions)
            recordsetFilterAction(
              'ADD_RECORDSET_FILTER',
              filters('attribution', filterAttributions)
            )
            updateSimpleField('recordsetFilterAttributionInput', '')
          }}
          onUpdateInput={value => {
            updateSimpleField('recordsetFilterAttributionInput', value)
          }}
        />
        <div>
          {(recordsetFilterAttribution || []).map((e, i) => {
            return (
              <div
                key={i}
                style={{ ...border, cursor: 'pointer' }}
                onClick={() => {
                  const filterAttributions = recordsetFilterAttribution.filter(
                    a => {
                      return a._id !== e._id
                    }
                  )
                  updateSimpleField(
                    'recordsetFilterAttribution',
                    filterAttributions
                  )
                  if (filterAttributions.length) {
                    recordsetFilterAction(
                      'ADD_RECORDSET_FILTER',
                      filters['attribution'](filterAttributions)
                    )
                  } else {
                    recordsetFilterAction(
                      'REMOVE_RECORDSET_FILTER',
                      'attribution'
                    )
                  }
                }}
              >
                {e.attribution + suffix(e.isIncome)}
                {' [ x ]'}
              </div>
            )
          })}
        </div>
        <FlatButton
          label="Filterung leeren"
          onTouchTap={() => {
            recordsetFilterAction('RESET_RECORDSET_FILTER')
            props.forEach(({ field }) => updateSimpleField(field, ''))
            updateSimpleField('recordsetFilterAttribution', [])
            updateSimpleField('recordsetFilterAttributionInput', '')
          }}
        />
      </div>
    </div>
  )
}

export default RecordsetFilterComponent
