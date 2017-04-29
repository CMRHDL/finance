import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
// import TextField from 'material-ui/TextField'
// import FlatButton from 'material-ui/FlatButton'
// import numeral from 'numeral'

import Attribution from './Attribution'

let Settings = () => {
  return (
    <div>
      <Tabs style={{ padding: 25 }}>
        <Tab label="Zuordnungen">
          <Attribution />
        </Tab>
        <Tab label="Zuordnungen">
          Yo!
        </Tab>
      </Tabs>
    </div>
  )
}

export default Settings
// <Tab label="Allgemeine Einstellungen">
//   <TextField
//     value={settingsInitialAmount}
//     onChange={({ target: { value } }) => updateAttributionInput('settingsInitialAmount', numeral(value).value())}
//     floatingLabelText="Initialwert"
//   />
//   <FlatButton
//     label="Speichern"
//     style={style.big}
//     onTouchTap={() => {
//       const isIncome = true
//       saveAttribution({ ...props, isIncome })
//     }}
//   />
