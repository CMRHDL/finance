import addedRecordset from './addedRecordset'
import code from './code'
import login from './login'
import newRecordset from './newRecordset'
import recordset from './recordset'
import settings from './settings'
import recordsetFilter from './recordsetFilter'
import { combineReducers } from 'redux'
import { simpleFields } from './simpleFields'

const reducers = combineReducers({
  addedRecordset,
  code,
  login,
  newRecordset,
  recordset,
  recordsetFilter,
  settings,
  simpleFields,
})

export default reducers
