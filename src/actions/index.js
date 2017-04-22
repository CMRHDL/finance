import { simpleFieldsPrefix } from '../reducers/simpleFields'

const makeActionCreator = (type, ...argNames) => (...args) => {
  let action = { type }
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index]
  })
  return action
}

export const login = makeActionCreator('LOGIN')
export const logout = makeActionCreator('LOGOUT')
export const updateCode = makeActionCreator('UPDATE_CODE', 'code')
export const updateCodePosition = makeActionCreator('UPDATE_CODE_POSITION')
export const updateSettingsAttributionInput = makeActionCreator('UPDATE_SETTINGS_ATTRIBUTION_INPUT', 'value')
export const addSettingsAttributionIncome = makeActionCreator('ADD_SETTINGS_ATTRIBUTION_INCOME', 'value')
export const addSettingsAttributionExpense = makeActionCreator('ADD_SETTINGS_ATTRIBUTION_EXPENSE', 'value')

export const updateNewRecordset = prop => {
  const update = {
    date: makeActionCreator('UPDATE_NEWRECORDSET_DATE', 'value'),
    description: makeActionCreator('UPDATE_NEWRECORDSET_DESCRIPTION', 'value'),
    amount: makeActionCreator('UPDATE_NEWRECORDSET_AMOUNT', 'value'),
    attribution: makeActionCreator('UPDATE_NEWRECORDSET_ATTRIBUTION', 'value', 'isIncome'),
    reset: makeActionCreator('RESET_NEWRECORDSET'),
  }

  return update[prop]
}

export const updateAddedRecordset = prop => {
  const update = {
    add: makeActionCreator('ADD_ADDEDRECORDSET', 'value'),
    remove: makeActionCreator('REMOVE_ADDEDRECORDSET', 'value'),
  }

  return update[prop]
}

export const actionForSimpleField = field => makeActionCreator(simpleFieldsPrefix + field.toUpperCase(), 'value')
