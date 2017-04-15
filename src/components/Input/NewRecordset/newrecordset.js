import React from 'react'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const style= {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  child: {
    flex: '1',
    textAlign: 'center',
    display: 'inline-block',
  },
  small: {
    width: 150
  },
  medium: {
    width: 250
  },
}

let DateTimeFormat;

if (areIntlLocalesSupported(['de', 'de-DE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/de');
  require('intl/locale-data/jsonp/de-DE');
}

let NewRecordset = () => {

  let handleIncome = (event, index, value) => {

  }

  return (
    <div>
      <div style={style.container} >
        <DatePicker
          hintText="Datum"
          locale="de-DE"
          DateTimeFormat={DateTimeFormat}
        />
        <div style={style.child} >
          <TextField
            hintText="Beschreibung"
          />
        </div>
        <div style={style.child} >
          <TextField
            type="number"
            floatingLabelText="Betrag"
          />
        </div>
        <RadioButtonGroup name="typeOfRecordset" defaultSelected="income">
          <RadioButton
            value="income"
            label="Einnahme"
          />
          <RadioButton
            value="expense"
            label="Ausgabe"
          />
        </RadioButtonGroup>
        <DropDownMenu onChange={handleIncome} style={style.child}>
          <MenuItem value={null} primaryText="Einnahme" />
        </DropDownMenu>
      </div>
    </div>
  )
}

export default NewRecordset
