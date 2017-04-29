import React from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Snackbar from '../Misc/Snackbar'
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { Tabs, Tab } from 'material-ui/Tabs'

const center = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 100,
}

const innerCenter = {
  padding: 10,
  width: 'auto',
  position: 'relative',
  textAlign: 'center',
}

const style = { center, innerCenter }

const InputGroup = ({
  id,
  label,
  url,
  login,
  updateLoginError,
  username,
  password,
  updateUsername,
  updatePassword,
}) => {
  let handleLoginError = e => {
    let message = get(e, 'response.data.message') || get(e, 'response.data')
    updateLoginError(message)
  }

  let handleLogin = () => {
    login()
    browserHistory.push('/home')
  }
  return (
    <div style={style.innerCenter}>

      <TextField
        id={id}
        floatingLabelText="Username"
        onChange={updateUsername}
        value={username}
      />
      <br />
      <br />

      <TextField
        floatingLabelText="Password"
        type="password"
        onChange={updatePassword}
        value={password}
        onKeyDown={({ keyCode }) => {
          if (keyCode === 13) {
            axios
              .post(url, { username, password })
              .then(handleLogin)
              .catch(handleLoginError)
          }
        }}
      /><br />
      <br />

      <FlatButton
        label={label}
        primary={true}
        onTouchTap={() => {
          axios
            .post(url, { username, password })
            .then(handleLogin)
            .catch(handleLoginError)
        }}
      />

    </div>
  )
}

const LoginComponent = props => {
  return (
    <div style={style.center}>
      <Paper
        zDepth={1}
        children={
          <div>

            <Tabs>
              <Tab
                label="Login"
                onActive={() => {
                  document.getElementById('login').focus()
                }}
              >
                <InputGroup
                  id="login"
                  label="Login"
                  url="/api/session"
                  {...props}
                />
              </Tab>
              <Tab
                label="Register"
                onActive={() => {
                  document.getElementById('register').focus()
                }}
              >
                <InputGroup
                  id="register"
                  label="Register"
                  url="/api/account"
                  {...props}
                />
              </Tab>
            </Tabs>

            <Snackbar
              message={props.loginError}
              updateMessage={props.updateLoginError}
            />

          </div>
        }
      />
    </div>
  )
}

export default LoginComponent
