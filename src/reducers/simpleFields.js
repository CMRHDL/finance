const simpleFieldsPrefix = 'SIMPLEFIELDS_UPDATE_'

const fields = [
  'username',
  'password',
  'loginError',
  'addedNewRecordsetSuccess',
  'attributionInput',
  'addAttributionFailure',
  'openAttributionDialog',
  'filterAmountMin',
  'filterAmountMax',
  'filterDescription',
  'filterCode',
]

const initialState = fields.reduce((o, e) => {
  o[e] = ''
  return o
}, {})

const simpleFields = (state = initialState, action) => {
  const cases = fields.reduce((o, e) => {
    o[simpleFieldsPrefix + e.toUpperCase()] = { ...state, [e]: action.value }
    return o
  }, {})

  return cases[action.type] || state
}

export { simpleFields, simpleFieldsPrefix }
