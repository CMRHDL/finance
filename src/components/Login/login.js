import React from 'react'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import get from 'lodash/get';
import { browserHistory } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';

const center = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 100,
};

const innerCenter = {
  padding: 10,
  width: 'auto',
  position: 'relative',
  textAlign: 'center',
};

const style = { center, innerCenter }
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
      <Paper  zDepth={1} children={
        <div >

          <Tabs>
            <Tab label="Login" >
              <div style={style.innerCenter} >

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

              </div>
            </Tab>
            <Tab label="Register" >
              <div style={style.innerCenter} >

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
                  label="Register"
                  primary={true}
                  onTouchTap={() => {
                    axios.post('/api/account', { username, password })
                      .then(handleLogin)
                      .catch(handleLoginError);
                  }}
                />

              </div>
            </Tab>
          </Tabs>

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
