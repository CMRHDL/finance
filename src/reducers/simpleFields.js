const simpleFieldsPrefix = 'SIMPLEFIELDS_UPDATE_'

const fields = [
  'addAttributionFailure',
  'addedNewRecordsetSuccess',
  'attributionInput',
  'codeUseSaveMode',
  'filterAmountMax',
  'filterAmountMin',
  'filterCode',
  'filterDescription',
  'loginError',
  'openAttributionDialog',
  'password',
  'recordsetExportFilename',
  'recordsetOrderColumn',
  'recordsetOrderOrder',
  'username',
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
