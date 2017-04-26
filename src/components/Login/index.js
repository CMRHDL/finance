import LoginComponent from './login'

import { login, updateSimpleField } from '../../actions'
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
    dispatch(updateSimpleField('loginError')(value))
  },
  updateUsername: ({ target: { value } }) => {
    dispatch(updateSimpleField('username')(value))
  },
  updatePassword: ({ target: { value } }) => {
    dispatch(updateSimpleField('password')(value))
  },
})

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default Login
