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

export const addedRecordsetAction = prop => {
  const update = {
    add: makeActionCreator('ADD_ADDEDRECORDSET', 'value'),
    remove: makeActionCreator('REMOVE_ADDEDRECORDSET', 'value'),
    reset: makeActionCreator('RESET_ADDEDRECORDSET'),
  }

  return update[prop]
}

export const recordsetAction = prop => {
  const update = {
    add: makeActionCreator('ADD_RECORDSET', 'data'),
  }

  return update[prop]
}

export const settingsAction = prop => {
  const update = {
    ADD_ATTRIBUTION: makeActionCreator('ADD_ATTRIBUTION', 'attribution'),
    SET_ATTRIBUTION: makeActionCreator('SET_ATTRIBUTION', 'attributions'),
  }

  return update[prop]
}

export const recordsetFilterAction = prop => {
  const update = {
    ADD_RECORDSET_FILTER: makeActionCreator('ADD_RECORDSET_FILTER', 'value'),
    RESET_RECORDSET_FILTER: makeActionCreator('RESET_RECORDSET_FILTER'),
    REMOVE_RECORDSET_FILTER: makeActionCreator('REMOVE_RECORDSET_FILTER', 'id'),
  }

  return update[prop]
}

export const updateSimpleField = field => makeActionCreator(simpleFieldsPrefix + field.toUpperCase(), 'value')
