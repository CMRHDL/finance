const settings = (state = { attributionInput: '', attributionIncome: [ 'Miete' ], attributionExpense: [ 'Stife' ] }, action) => {
  switch (action.type) {
    case 'UPDATE_SETTINGS_ATTRIBUTION_INPUT':
      return ({
        ...state,
        attributionInput: action.value
      })
    case 'ADD_SETTINGS_ATTRIBUTION_INCOME':
      return ({
        ...state,
        attributionIncome: [ ...state.attributionIncome, action.value ]
      })
    case 'ADD_SETTINGS_ATTRIBUTION_EXPENSE':
      return ({
        ...state,
        attributionExpense: [ ...state.attributionExpense, action.value ]
      })
    default:
      return state
  }
}

export default settings
