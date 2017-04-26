import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import Home from 'material-ui/svg-icons/action/home'
import Details from 'material-ui/svg-icons/action/trending-up'
import Overview from 'material-ui/svg-icons/av/playlist-add-check'
import Input from 'material-ui/svg-icons/content/create'
import Settings from 'material-ui/svg-icons/action/build'
import findIndex from 'lodash/findIndex'

import { browserHistory } from 'react-router'

import { bind } from '../../util'

const route = newLocation => {
  browserHistory.push(`/${newLocation}`)
}

const Header = props => {
  const routes = [
    { icon: <Home />, url: 'home' },
    { icon: <Input />, url: 'home/input' },
    { icon: <Overview />, url: 'home/overview' },
    { icon: <Details />, url: 'home/details' },
    { icon: <Settings />, url: 'home/settings' },
  ]
  const initialSelectedIndex = findIndex(routes, ({ url }) => props.location.pathname === '/' + url)
  return (
    <div>
      <Tabs initialSelectedIndex={initialSelectedIndex}>
        {routes.map(({ icon, url }, i) => <Tab key={i} icon={icon} onActive={bind(route, url)} />)}
      </Tabs>
      {props.children}
    </div>
  )
}

export default Header
