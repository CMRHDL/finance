import React from 'react'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import areIntlLocalesSupported from 'intl-locales-supported'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Done from 'material-ui/svg-icons/action/done'
import NotDone from 'material-ui/svg-icons/content/clear'
import { lightGreen500 } from 'material-ui/styles/colors'
import { generateCode, parseCode, bind, suffix } from '../../../util'
import {
  amount as adjustamount,
  createDatasource,
} from '../../../util/recordset.util'
import maxBy from 'lodash/maxBy'

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
  },
  child: {
    flex: '1',
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

const isComplete = ({ amount, attribution, date, description }) =>
  amount && attribution && date && description

let NewRecordset = ({
  addedRecordset,
  addedRecordsetAction,
  attributions,
  code,
  newRecordset,
  simpleFields,
  updateCodePosition,
  updateNewRecordset,
  updateSimpleField,
}) => {
  let { date, description, amount, attribution } = newRecordset

  let dataSource = createDatasource(attributions)

  return (
    <div style={style.container}>
      <div style={style.child}>
        <DatePicker
          autoOk={true}
          container="inline"
          DateTimeFormat={DateTimeFormat}
          floatingLabelText="Datum"
          locale="de-DE"
          value={date}
          onChange={(err, date) => {
            updateNewRecordset('date', date)
          }}
        />
      </div>
      <div style={style.child}>
        <RaisedButton
          backgroundColor={isComplete(newRecordset) ? lightGreen500 : ''}
          containerElement="label"
          icon={isComplete(newRecordset) ? <Done /> : <NotDone />}
          id="addRecordsetButton"
          label="Übernehmen"
          labelPosition="before"
          onTouchTap={() => {
            if (isComplete(newRecordset)) {
              const adjustedRecordset = adjustamount({
                ...newRecordset,
                code: generateCode(code),
              })
              addedRecordsetAction('add', adjustedRecordset)
              updateNewRecordset('reset')

              if (simpleFields.codeUseSaveMode) {
                updateCodePosition(
                  parseCode(
                    maxBy([...addedRecordset, adjustedRecordset], 'code').code
                  )
                )
              }
            }
          }}
        /><br /><br />
        <TextField
          floatingLabelText="Beschreibung"
          value={description}
          onChange={({ target: { value } }) => {
            updateNewRecordset('description', value)
          }}
        /><br /><br />
        <TextField
          floatingLabelText="Betrag"
          value={amount}
          onChange={({ target: { value } }) => {
            updateNewRecordset('amount', value)
          }}
        /><br /><br />
        <div>
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
          <FlatButton
            label="+"
            primary={true}
            onTouchTap={bind(
              updateSimpleField,
              'openAttributionDialog',
              'open'
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default NewRecordset
