import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import Attribution from './Attribution'

let Settings = () => {
  return (
    <div>
      <Tabs>
        <Tab label="Zuordnungen">
          <Attribution />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Settings
