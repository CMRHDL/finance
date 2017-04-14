import React from 'react'

import CodeSelector from './CodeSelector'
import NewRecordset from './NewRecordset'
import RecordsetList from './RecordsetList'

let Input = () => {
  return (
    <div>
      <CodeSelector />
      <NewRecordset />
      <RecordsetList />
    </div>
  )
}

export default Input
