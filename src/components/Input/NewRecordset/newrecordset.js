import React from 'react'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

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

let NewRecordset = () => {
  return (
    <div>
      <div style={style.container} >
        <DatePicker hintText="Datum" />
        <div style={style.child} >
          <TextField
            hintText="Beschreibung"
             style={style.medium}
          />
        </div>
        <div style={style.child} >
          <TextField
            type="number"
            hintText="Betrag"
             style={style.small}
          />
        </div>
        <div style={style.child} >
          <TextField
            hintText="Hint Text"
          />
        </div>
      </div>
    </div>
  )
}

export default NewRecordset
