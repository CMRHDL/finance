import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import Home from 'material-ui/svg-icons/action/home';
import Details from 'material-ui/svg-icons/action/trending-up';
import Overview from 'material-ui/svg-icons/av/playlist-add-check';
import Input from 'material-ui/svg-icons/content/create';
import Settings from 'material-ui/svg-icons/action/build';

import { browserHistory } from 'react-router';

const route = (newLocation) => {
  browserHistory.push(`/${newLocation}`)
}

let Header = (props) => {
  return (
    <div>
      <Tabs>
        <Tab icon={<Home />} onActive={route.bind(null, 'home')} />
        <Tab icon={<Input />} onActive={route.bind(null, 'home/input')} />
        <Tab icon={<Overview />} onActive={route.bind(null, 'home/overview')} />
        <Tab icon={<Details />} onActive={route.bind(null, 'home/details')} />
        <Tab icon={<Settings />} onActive={route.bind(null, 'home/settings')} />
      </Tabs>
      {props.children}
    </div>
  )
}

export default Header
