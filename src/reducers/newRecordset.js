const newRecordset = (
  state = {
    amount: '',
    attribution: null,
    date: null,
    description: '',
  },
  action
) => {
  switch (action.type) {
    case 'UPDATE_NEWRECORDSET_DATE':
      return {
        ...state,
        date: action.value,
      }
    case 'UPDATE_NEWRECORDSET_DESCRIPTION':
      return {
        ...state,
        description: action.value,
      }
    case 'UPDATE_NEWRECORDSET_AMOUNT':
      return {
        ...state,
        amount: action.value,
      }
    case 'UPDATE_NEWRECORDSET_ATTRIBUTION':
      return {
        ...state,
        attribution: action.value,
      }
    case 'RESET_NEWRECORDSET':
      return {
        ...state,
        amount: '',
        attribution: '',
        description: '',
        isIncome: true,
      }
    case 'SET_NEWRECORDSET':
      return action.value
    default:
      return state
  }
}

export default newRecordset
