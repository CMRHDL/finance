import React from 'react'
import TextField from 'material-ui/TextField'

const Textfield = ({ value, onChange, label = 'Text' }) => {
  const cb = ({ target: { value } }) => onChange(value)
  return <TextField floatingLabelText={label} value={value} onChange={cb} />
}

export default Textfield
