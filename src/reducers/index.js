import { combineReducers } from 'redux'
import addedRecordset from './addedRecordset'
import code from './code'
import login from './login'
import newRecordset from './newRecordset'
import settings from './settings'
import { simpleFields } from './simpleFields'

const reducers = combineReducers({
  addedRecordset,
  code,
  login,
  newRecordset,
  settings,
  simpleFields,
})

export default reducers
