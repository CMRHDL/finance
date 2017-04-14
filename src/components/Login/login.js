import React from 'react'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import get from 'lodash/get';
import { browserHistory } from 'react-router';

const paper = {
  height: 275,
  width: 300,
  marginTop: 100,
  textAlign: 'center',
  display: 'inline-block',
};

const center = {
  display: 'flex',
  justifyContent: 'center',
};

const top = {
  marginTop: 25,
};

const style = { paper, center, top }
let username, password

const LoginComponent = ({ login, loginError, updateLoginError }) => {

  let handleLoginError = (e) => {
    let message = get(e, 'response.data.message') || get(e, 'response.data')
    updateLoginError(message)
  }

  let handleLogin = () => {
    login()
    browserHistory.push('/home')
  }

  return (
    <div style={style.center} >
      <Paper style={style.paper} zDepth={1} children={
        <div style={style.top}>

          <TextField
            floatingLabelText="Username"
            onChange={({ target: { value } }) => {
              username = value
            }}
          /><br />
          <br />

          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={({ target: { value } }) => {
              password = value
            }}
          /><br />
          <br />

          <FlatButton
            label="Login"
            primary={true}
            onTouchTap={() => {
              axios.post('/api/session', { username, password })
                .then(handleLogin)
                .catch(handleLoginError);
            }}
          />

          <Snackbar
            open={!!loginError}
            message={loginError}
            autoHideDuration={4000}
            onRequestClose={() => updateLoginError('') }
          />

        </div>
      } />
    </div>
  )
}

export default LoginComponent
