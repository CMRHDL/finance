import { combineReducers } from 'redux'
import code from './code'
import login from './login'
import loginError from './loginError'

const reducers = combineReducers({
  code,
  login,
  loginError,
})

export default reducers
