import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
injectTapEventPlugin()

import Details from './components/Details'
import Header from './components/Header'
import Home from './components/Home'
import Input from './components/Input'
import Login from './components/Login'
import Overview from './components/Overview'
import Settings from './components/Settings'

const NotFound = () => <h1>404.. This page is not found!</h1>

import reducers from './reducers'
const store = createStore(reducers)

import { init } from './init'
init(store)

const verifyLogin = () => {
  // if (!store.getState().login) {
  //   browserHistory.push('/login');
  // }
}

store.subscribe(() => {
  verifyLogin()
})

export default class Routes extends Component {
  redirectIfLoggedIn = () => {
    if (store.getState().login) {
      browserHistory.push('/home')
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/login" component={Login} onEnter={this.redirectIfLoggedIn}>
              <Route path="*" component={NotFound} />
            </Route>
            <Route path="/home" component={Header} onEnter={verifyLogin}>
              <IndexRoute component={Home} />
              <Route path="input" component={Input} />
              <Route path="overview" component={Overview} />
              <Route path="details" component={Details} />
              <Route path="settings" component={Settings} />
              <Route path="*" component={NotFound} />
            </Route>
            <Route path="*" component={Login} onEnter={this.redirectIfLoggedIn} />
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
