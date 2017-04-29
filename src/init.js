import axios from 'axios'
import maxBy from 'lodash/maxBy'
import moment from 'moment'
import sortBy from 'lodash/sortBy'

moment.locale('de')

import {
  recordsetAction,
  updateCode,
  updateCodePosition,
  updateNewRecordset,
  settingsAction,
  updateSimpleField,
} from './actions'
import { parseCode } from './util'

export const init = store => {
  const tasks = [setSimpleFields, setRecordset, setAttribution]
  tasks.forEach(e => e(store))
}

async function setSimpleFields(store) {
  store.dispatch(updateSimpleField('codeUseSaveMode')(true))
  store.dispatch(
    updateSimpleField('recordsetExportFilename')(
      `${moment().format('L')}-Finanzen`
    )
  )
}

async function setRecordset(store) {
  const { data } = await axios.get('/api/recordset')
  store.dispatch(recordsetAction('add')(data))
  if (data.length) {
    store.dispatch(updateCode(parseCode(maxBy(data, 'code').code)))
    store.dispatch(updateCodePosition())
    store.dispatch(
      updateNewRecordset('date')(moment(maxBy(data, 'date').date).toDate())
    )
  }
}

async function setAttribution(store) {
  const { data } = await axios.get('/api/attribution')
  store.dispatch(
    settingsAction('SET_ATTRIBUTION')(sortBy(data, ['attribution']))
  )
}
