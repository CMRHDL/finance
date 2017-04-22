import LoginComponent from './login'

import { login, actionForSimpleField } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  loginError: state.simpleFields.loginError,
  username: state.simpleFields.username,
  password: state.simpleFields.password,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: () => {
    dispatch(login())
  },
  updateLoginError: value => {
    dispatch(actionForSimpleField('loginError')(value))
  },
  updateUsername: ({ target: { value } }) => {
    dispatch(actionForSimpleField('username')(value))
  },
  updatePassword: ({ target: { value } }) => {
    dispatch(actionForSimpleField('password')(value))
  },
})

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default Login
