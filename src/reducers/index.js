import { combineReducers } from 'redux'
import code from './code'
import login from './login'
import loginError from './loginError'
import settings from './settings'

const reducers = combineReducers({
  code,
  login,
  loginError,
  settings,
})

export default reducers
