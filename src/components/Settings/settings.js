import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
// import TextField from 'material-ui/TextField'
// import FlatButton from 'material-ui/FlatButton'
// import numeral from 'numeral'

import Attribution from './Attribution'
import axios from 'axios/index'
import numeral from 'numeral'

// migration for 1-time-usage
const onSubmit = async e => {
  e.preventDefault()
  const file = document.getElementById('the_file').files[0]
  const reader = new FileReader()
  reader.onload = async function(file) {
    let [definition, ...rows] = file.target.result.split(/[\r\n|\n]+/)

    definition = definition.split('","').map(r => r.replace(/"/g, ''))
    rows = rows.map(r => r.split('","').map(r => r.replace(/"/g, '')))
    rows = rows.map(values =>
      values.reduce((o, v, i) => ({ ...o, [definition[i]]: v }), {})
    )

    const NOW = new Date()

    const { data: currentAttributions } = await axios.get('/api/attribution')
    const newAttributions = rows.reduce((attrs, { Einnahmen, Zuordnung }) => {
      const isIncome = !!Einnahmen
      const newAtt = {
        attribution: Zuordnung,
        isIncome,
      }

      if (
        !attrs.some(a => JSON.stringify(a) === JSON.stringify(newAtt)) &&
        !currentAttributions
          .map(({ attribution, isIncome }) => ({
            attribution,
            isIncome,
          }))
          .some(a => JSON.stringify(a) === JSON.stringify(newAtt))
      ) {
        return [...attrs, newAtt]
      }

      return attrs
    }, [])

    // get new Attrs
    // get current Attrs
    // merge and deduplicate
    // insert new Attrs
    // fetch all available attrs

    // map rows to recordsets with correct attr

    await Promise.all(
      newAttributions.map(a =>
        axios.post('/api/attribution', {
          ...a,
          updatedAt: NOW,
        })
      )
    )
    const { data: allAttrs } = await axios.get('/api/attribution')

    const recordSets = rows.map(
      ({ Code, Datum, Beschreibung, Einnahmen, Ausgaben, Zuordnung }) => {
        const isIncome = !!Einnahmen
        const attr = {
          attribution: Zuordnung,
          isIncome,
        }

        const { _id } = allAttrs.find(
          ({ attribution, isIncome }) =>
            JSON.stringify({
              attribution,
              isIncome,
            }) === JSON.stringify(attr)
        )

        const amount = Einnahmen || Ausgaben

        const [day, month, year] = Datum.split('.')

        return {
          date: new Date([month, day, year].join('.')),
          attribution: _id,
          code: Code,
          description: Beschreibung,
          amount: isIncome
            ? numeral(amount).value()
            : numeral(amount).value() * -1,
          updatedAt: NOW,
        }
      }
    )

    await Promise.all(recordSets.map(a => axios.post('/api/recordset', a)))
  }
  reader.readAsText(file)
}

let Settings = () => {
  return (
    <div>
      <Tabs style={{ padding: 25 }}>
        <Tab label="Zuordnungen">
          <Attribution />
        </Tab>
        <Tab label="Import">
          <form onSubmit={onSubmit}>
            <input
              type="file"
              id="the_file"
              required="required"
              accept=".csv"
            />
            <input type="submit" value="Import" />
          </form>
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
