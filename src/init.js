import axios from 'axios'
import maxBy from 'lodash/maxBy'
import moment from 'moment'
import sortBy from 'lodash/sortBy'

import {
  recordsetAction,
  updateCode,
  updateCodePosition,
  updateNewRecordset,
  settingsAction,
} from './actions'
import { parseCode } from './util'

export const init = store => {
  axios
    .get('/api/recordset')
    .then(({ data }) => {
      store.dispatch(recordsetAction('add')(data))
      if (data.length) {
        store.dispatch(updateCode(parseCode(maxBy(data, 'code').code)))
        store.dispatch(updateCodePosition())
        store.dispatch(
          updateNewRecordset('date')(moment(maxBy(data, 'date').date).toDate())
        )
      }
    })
    .catch(console.log)

  axios
    .get('/api/attribution')
    .then(({ data }) => {
      store.dispatch(
        settingsAction('SET_ATTRIBUTION')(sortBy(data, ['attribution']))
      )
    })
    .catch(console.log)
}
