import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import moment from 'moment'

moment.locale('de')

import './index.css'

ReactDOM.render(<Routes />, document.getElementById('root'))
