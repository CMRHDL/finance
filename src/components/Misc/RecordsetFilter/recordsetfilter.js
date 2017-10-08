import AutoComplete from 'material-ui/AutoComplete'
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Datepicker from '../../Misc/Datepicker'
import Textfield from '../../Misc/Textfield'
import { createDatasource } from '../../../util/recordset.util'
import { suffix } from '../../../util'
import { updateFilter } from './util'

// prettier-ignore
const _simpleFilterFields = [
  { label: 'Betrag von', field: 'filterAmountMin', type: 'text' },
  { label: 'Betrag bis', field: 'filterAmountMax', type: 'text' },
  { label: 'Beschreibung beinhaltet', field: 'filterDescription', type: 'text' },
  { label: 'Code beinhaltet', field: 'filterCode', type: 'text' },
  { label: 'Datum von', field: 'filterDateMax', type: 'date' },
  { label: 'Datum bis', field: 'filterDateMin', type: 'date' },
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

const RecordsetFilterComponent = props => {
  const {
    attributions,
    recordsetFilterAction,
    simpleFields,
    updateSimpleField,
  } = props
  const { filterAttribution, recordsetFilterAttributionInput } = simpleFields
  const ids = (filterAttribution || []).map(e => e._id)
  let dataSource = createDatasource(attributions).filter(
    e => ids.indexOf(e.attribution._id) === -1
  )

  const simpleFilterFields = _simpleFilterFields.map(field => ({
    ...field,
    key: field.field,
    defaultValue: field.type === 'text' ? '' : null,
    value: simpleFields[field.field] || (field.type === 'text' ? '' : null),
    onChange: updateFilter(props, field.field),
  }))

  return (
    <div>
      <div style={{ padding: 25, ...center }}>
        {simpleFilterFields.map(
          field =>
            field.type === 'text'
              ? <Textfield {...field} />
              : <Datepicker {...field} />
        )}
      </div>
      <div style={{ padding: 25, ...center }}>
        <AutoComplete
          floatingLabelText="Zuordnung"
          filter={AutoComplete.fuzzyFilter}
          dataSource={dataSource}
          openOnFocus={true}
          searchText={recordsetFilterAttributionInput}
          listStyle={{
            overflowY: 'scroll',
            maxHeight: '300px',
          }}
          onNewRequest={({ attribution }) => {
            const filterAttributions = [...filterAttribution, attribution]
            updateFilter(props, 'filterAttribution', filterAttributions)
            updateSimpleField('recordsetFilterAttributionInput', '')
          }}
          onUpdateInput={value => {
            updateSimpleField('recordsetFilterAttributionInput', value)
          }}
        />
        <div>
          {(filterAttribution || []).map((e, i) => {
            return (
              <div
                key={i}
                style={{ ...border, cursor: 'pointer' }}
                onClick={() => {
                  updateFilter(
                    props,
                    'filterAttribution',
                    filterAttribution.filter(a => a._id !== e._id)
                  )
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
            simpleFilterFields.forEach(({ field, defaultValue }) =>
              updateSimpleField(field, defaultValue)
            )
            updateSimpleField('filterAttribution', [])
            updateSimpleField('recordsetFilterAttributionInput', '')
          }}
        />
      </div>
    </div>
  )
}

export default RecordsetFilterComponent
