import React from 'react'

import RecordsetExporter from '../Misc/RecordsetExporter'
import RecordsetFilter from '../Misc/RecordsetFilter'
import RecordsetList from '../Misc/RecordsetList'

const style = {
  padding: {
    padding: 25,
  },
}

const Overview = ({ recordset, recordsetAction, recordsetFilter }) => {
  return (
    <div style={style.padding}>
      <RecordsetFilter />
      <RecordsetExporter />
      <RecordsetList
        recordset={recordset}
        recordsetAction={recordsetAction}
        recordsetFilter={recordsetFilter}
      />
    </div>
  )
}

export default Overview
