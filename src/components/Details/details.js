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

const Details = ({
  recordset,
  recordsetFilter,
  simpleFields: { recordsetOrderColumn },
  simpleFields: { recordsetOrderOrder },
}) => {
  const data = adjustRecordset({
    recordset,
    recordsetFilter,
    recordsetOrderColumn,
    recordsetOrderOrder,
  })

  const props = { recordset: data, chartStyle }
  return (
    <div>
      <RecordsetFilter />
      <SimpleLine {...props} />
      <SimpleBar {...props} />
    </div>
  )
}

export default Details
