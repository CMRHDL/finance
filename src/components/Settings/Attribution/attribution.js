import React from 'react'
import Chip from 'material-ui/Chip'
import { green400, red400 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

const style = {
  padding: {
    padding: 50,
  },
  margin: {
    margin: 50,
  },
  wide: {
    width: 300,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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

const listAttributions = (attributions, isIncome) => {
  const color = isIncome ? green400 : red400
  return (
    <Paper
      style={{ ...style.padding, ...style.wide }}
      children={attributions.map((e, i) => <Chip backgroundColor={color} key={i}>{e}</Chip>)}
    />
  )
}

const listIncome = attributions => listAttributions(attributions, true)
const listExpense = attributions => listAttributions(attributions, false)

let Attribution = ({
  addSettingsAttributionExpense,
  addSettingsAttributionIncome,
  attributionExpense,
  attributionIncome,
  attributionInput,
  updateSettingsAttributionInput,
}) => {
  return (
    <div style={style.padding}>
      <div style={style.container}>
        <TextField
          value={attributionInput}
          onChange={updateSettingsAttributionInput}
          floatingLabelText="Zuordnung hinzufügen"
        />
        <FlatButton
          label="Einnahme"
          style={style.big}
          onTouchTap={addSettingsAttributionIncome.bind(null, attributionInput)}
        />
        <FlatButton
          label="Ausgabe"
          style={style.big}
          onTouchTap={addSettingsAttributionExpense.bind(null, attributionInput)}
        />
      </div><br /><br />
      <div style={{ ...style.container, ...style.margin }}>
        {listIncome(attributionIncome)}
        {listExpense(attributionExpense)}
      </div>
    </div>
  )
}

export default Attribution
