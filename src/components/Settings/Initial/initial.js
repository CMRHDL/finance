import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const Initial = ({
  initialAmount,
  settingsAction,
}) => {
  return (
    <div>

      <TextField
        floatingLabelText="Initialwert"
        onChange={({ target: { value } }) => {
          settingsAction('UPDATE_INITIAL_AMOUNT', value)
        }}
        value={initialAmount}
      />

      <FlatButton
        label="Speichern"
        primary={true}
        onTouchTap={() => {
          axios
            .post(url, { username, password })
            .then(handleLogin)
            .catch(handleLoginError)
        }}
      />
    </div>
  )
}

export default Initial
