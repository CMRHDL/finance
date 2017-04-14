import LoginComponent from './login'

import { login, updateLoginError } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  loginError: state.loginError,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: () => {
    dispatch(login())
  },
  updateLoginError: (message) => {
    dispatch(updateLoginError(message))
  },
})

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

export default Login
