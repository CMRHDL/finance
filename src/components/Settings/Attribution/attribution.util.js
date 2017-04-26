import { bind } from '../../../util'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'

function _saveAttribution(attributions, attribution, isIncome) {
  let obj = { attribution, isIncome }
  return new Promise((resolve, reject) => {
    const message = 'Zuordnung bereits vorhanden'
    !attribution || exists(attributions, obj)
      ? reject(message)
      : resolve(axios.post('/api/attribution', obj).then(({ data }) => data))
  })
}

function exists(attributions, obj) {
  return attributions
    .map(e => pick(e, ['attribution', 'isIncome']))
    .filter(bind(isEqual, obj)).length
}

export const saveAttribution = ({
  attributions,
  attributionInput,
  isIncome,
  settingsAction,
  updateSimpleField,
}) => {
  _saveAttribution(attributions, attributionInput, isIncome)
    .then(bind(settingsAction, 'ADD_ATTRIBUTION'))
    .catch(bind(updateSimpleField, 'addAttributionFailure'))
}
