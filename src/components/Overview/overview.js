import React from 'react'

import RecordsetList from '../Misc/RecordsetList'
import RecordsetFilter from '../Misc/RecordsetFilter'

const style = {
  padding: {
    padding: 25,
  },
}

const Overview = ({ recordset, recordsetAction, recordsetFilter }) => {
  return (
    <div style={style.padding}>
      <RecordsetFilter />
      <RecordsetList
        recordset={recordset}
        recordsetAction={recordsetAction}
        recordsetFilter={recordsetFilter}
      />
    </div>
  )
}

export default Overview
