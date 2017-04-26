import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { bind } from '../../../util'
import Snackbar from '../../Misc/Snackbar'
import { saveAttribution } from './attribution.util'
import { ListIncome, ListExpense } from './ListAttribution'

const style = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  big: {
    height: 'auto',
    lineHeight: 'auto',
  },
}

const Attribution = props => {
  const {
    updateSimpleField,
    addAttributionFailure,
    attributionInput,
    attributions,
    updateAttributionInput,
  } = props
  return (
    <div style={{ padding: 50 }}>
      <div style={style.container}>
        <TextField
          value={attributionInput}
          onChange={({ target: { value } }) => updateAttributionInput(value)}
          floatingLabelText="Zuordnung hinzufügen"
        />
        <FlatButton
          label="Einnahme"
          style={style.big}
          onTouchTap={() => {
            const isIncome = true
            saveAttribution({ ...props, isIncome })
          }}
        />
        <FlatButton
          label="Ausgabe"
          style={style.big}
          onTouchTap={() => {
            const isIncome = false
            saveAttribution({ ...props, isIncome })
          }}
        />
      </div><br /><br />
      <div style={{ ...style.container, margin: 50 }}>
        <ListIncome attributions={attributions.filter(e => e.isIncome)} />
        <ListExpense attributions={attributions.filter(e => !e.isIncome)} />
      </div>

      <Snackbar
        bodyStyle={{ background: 'orange' }}
        message={addAttributionFailure}
        updateMessage={bind(updateSimpleField, 'addAttributionFailure', '')}
      />
    </div>
  )
}

export default Attribution
