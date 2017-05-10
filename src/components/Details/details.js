import React from 'react'
import SimpleLine from './SimpleLine'
import SimpleBar from './SimpleBar'
import RecordsetFilter from '../Misc/RecordsetFilter'
import { adjustRecordset } from '../../util/recordset.util'

const chartStyle = {
  width: 800,
  height: 400,
  margin: {
    top: 20,
    right: 30,
    bottom: 20,
    left: 10,
  },
}

const Details = props => {
  const recordset = adjustRecordset(props)
  const chartProps = { recordset, chartStyle }
  return (
    <div>
      <RecordsetFilter />
      <SimpleLine {...chartProps} />
      <SimpleBar {...chartProps} />
    </div>
  )
}

export default Details
