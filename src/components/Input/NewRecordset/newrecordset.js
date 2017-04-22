import React from 'react'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import areIntlLocalesSupported from 'intl-locales-supported'
import MenuItem from 'material-ui/MenuItem'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import Done from 'material-ui/svg-icons/action/done'
import NotDone from 'material-ui/svg-icons/content/clear'
import { lightGreen500 } from 'material-ui/styles/colors'
import { bind } from '../../../util'

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

const createDatasource = (isIncome, arr) => {
  const suffix = isIncome ? '(E)' : '(A)'
  return arr.map(text => ({
    text: text + ' ' + suffix,
    value: <MenuItem primaryText={text} secondaryText={suffix} />,
    isIncome,
    attribution: text,
  }))
}

const isComplete = ({ amount, attribution, date, description }) => amount && attribution && date && description

const income = bind(createDatasource, true)
const expense = bind(createDatasource, false)

let NewRecordset = ({ updateCodePosition, attributionExpense, attributionIncome, newRecordset, updateNewRecordset, updateAddedRecordset }) => {
  let { date, description, amount, attribution, isIncome } = newRecordset

  let dataSource = [...income(attributionIncome), ...expense(attributionExpense)]

  return (
    <div style={style.container}>
      <div style={style.child}>
        <DatePicker
          hintText="Datum"
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
              updateAddedRecordset('add', newRecordset)
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
          type="number"
          floatingLabelText="Betrag"
          value={amount}
          onChange={({ target: { value } }) => {
            updateNewRecordset('amount', value)
          }}
        />
        <AutoComplete
          floatingLabelText="Zuordnung"
          filter={AutoComplete.fuzzyFilter}
          dataSource={dataSource}
          maxSearchResults={5}
          searchText={attribution + (attribution ? isIncome ? ' (E)' : ' (A)' : '')}
          openOnFocus={true}
          onNewRequest={({ attribution, isIncome }) => {
            updateNewRecordset('attribution', attribution, isIncome)
          }}
          onUpdateInput={value => value === '' && updateNewRecordset('attribution', '', true)}
        />
      </div>
    </div>
  )
}

export default NewRecordset
