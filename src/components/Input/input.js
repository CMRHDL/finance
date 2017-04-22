import React from 'react'

import CodeSelector from './CodeSelector'
import NewRecordset from './NewRecordset'
import RecordsetList from './RecordsetList'

const style = {
  padding: {
    padding: 25,
  },
}

let Input = () => {
  return (
    <div style={style.padding}>
      <CodeSelector />
      <NewRecordset />
      <RecordsetList />
    </div>
  )
}

export default Input
