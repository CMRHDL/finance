import React from 'react'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import areIntlLocalesSupported from 'intl-locales-supported'
import MenuItem from 'material-ui/MenuItem'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Done from 'material-ui/svg-icons/action/done'
import NotDone from 'material-ui/svg-icons/content/clear'
import { lightGreen500 } from 'material-ui/styles/colors'
import { generateCode, bind } from '../../../util'
import { amount as adjustamount } from '../../../util/recordset.util'
import sortBy from 'lodash/sortBy'

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
  child: {
    flex: '1',
    textAlign: 'center',
    display: 'inline-block',
  },
  childBig: {
    flex: '3',
    marginLeft: 100,
  },
  small: {
    width: 150,
  },
  medium: {
    width: 250,
  },
}

let DateTimeFormat

if (areIntlLocalesSupported(['de', 'de-DE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/de')
  require('intl/locale-data/jsonp/de-DE')
}

const suffix = isIncome => (isIncome ? ' (E)' : ' (A)')
const createDatasource = arr =>
  sortBy(
    arr.map(a => ({
      text: a.attribution + suffix(a.isIncome),
      value: (
        <MenuItem
          primaryText={a.attribution}
          secondaryText={suffix(a.isIncome)}
        />
      ),
      attribution: a,
      isIncome: a.isIncome,
    })),
    ['isIncome', 'text']
  )

const isComplete = ({ amount, attribution, date, description }) =>
  amount && attribution && date && description

let NewRecordset = ({
  code,
  updateCodePosition,
  attributions,
  newRecordset,
  updateNewRecordset,
  addedRecordsetAction,
  updateSimpleField,
}) => {
  let { date, description, amount, attribution } = newRecordset

  let dataSource = createDatasource(attributions)

  return (
    <div style={style.container}>
      <div style={style.child}>
        <DatePicker
          floatingLabelText="Datum"
          locale="de-DE"
          DateTimeFormat={DateTimeFormat}
          value={date}
          container="inline"
          autoOk={true}
          onChange={(err, date) => {
            updateNewRecordset('date', date)
          }}
        />
      </div>
      <div style={style.childBig}>
        <RaisedButton
          backgroundColor={isComplete(newRecordset) ? lightGreen500 : ''}
          label="Übernehmen"
          labelPosition="before"
          containerElement="label"
          icon={isComplete(newRecordset) ? <Done /> : <NotDone />}
          onTouchTap={() => {
            if (isComplete(newRecordset)) {
              updateCodePosition()
              addedRecordsetAction('add', adjustamount({
                ...newRecordset,
                code: generateCode(code),
              }))
              updateNewRecordset('reset')
            }
          }}
        />
        <TextField
          floatingLabelText="Beschreibung"
          value={description}
          onChange={({ target: { value } }) => {
            updateNewRecordset('description', value)
          }}
        />
        <TextField
          floatingLabelText="Betrag"
          value={amount}
          onChange={({ target: { value } }) => {
            updateNewRecordset('amount', value)
          }}
        />
        <FlatButton
          label="Zuordnung hinzufügen"
          primary={true}
          onTouchTap={bind(updateSimpleField, 'openAttributionDialog', 'open')}
        />
        <AutoComplete
          floatingLabelText="Zuordnung"
          filter={AutoComplete.fuzzyFilter}
          dataSource={dataSource}
          searchText={
            attribution
              ? attribution.attribution + suffix(attribution.isIncome)
              : ''
          }
          openOnFocus={true}
          onNewRequest={({ attribution }) => {
            updateNewRecordset('attribution', attribution)
          }}
          onUpdateInput={value => {
            value === '' && updateNewRecordset('attribution', null)
          }}
        />
      </div>
    </div>
  )
}

export default NewRecordset
