const settings = (state = { attributions: [], initialAmount: 0 }, action) => {
  switch (action.type) {
    case 'ADD_ATTRIBUTION':
      return {
        ...state,
        attributions: [...state.attributions, action.attribution],
      }
    case 'SET_ATTRIBUTION':
      return {
        ...state,
        attributions: action.attributions,
      }
    case 'UPDATE_INITIAL_AMOUNT':
      return {
        ...state,
        initialAmount: action.value,
      }
    default:
      return state
  }
}

export default settings
