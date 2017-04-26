import React from 'react'
import { green400, red400 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

const ListAttribution = ({ isIncome, attributions }) => {
  const color = isIncome ? green400 : red400
  return (
    <Paper
      style={{ padding: 50, width: 400 }}
      children={
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {attributions.map((e, i) => (
            <Chip backgroundColor={color} key={e._id} style={{ margin: 5 }}>
              {e.attribution}
            </Chip>
          ))}
        </div>
      }
    />
  )
}

export const ListIncome = props => (
  <ListAttribution {...props} isIncome={true} />
)
export const ListExpense = props => (
  <ListAttribution {...props} isIncome={false} />
)
