import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import areIntlLocalesSupported from 'intl-locales-supported'

let DateTimeFormat

if (areIntlLocalesSupported(['de', 'de-DE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/de')
  require('intl/locale-data/jsonp/de-DE')
}

const Datepicker = ({ value, onChange, label = 'Datum' }) => {
  const cb = (err, date) => onChange(date)
  return (
    <DatePicker
      autoOk={true}
      container="inline"
      DateTimeFormat={DateTimeFormat}
      floatingLabelText={label}
      locale="de-DE"
      value={value}
      onChange={cb}
      cancelLabel={'Feld leeren'}
      onDismiss={() => {
        cb(null)
      }}
    />
  )
}

export default Datepicker
