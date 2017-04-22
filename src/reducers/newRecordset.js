import moment from 'moment'

const newRecordset = (
  state = {
    amount: -5,
    attribution: '',
    date: moment().toDate(),
    description: 'Miete Januar 2017',
    isIncome: true,
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
        isIncome: action.isIncome,
      }
    case 'RESET_NEWRECORDSET':
      return {
        ...state,
        amount: 0,
        attribution: '',
        description: '',
        isIncome: true,
      }
    default:
      return state
  }
}

export default newRecordset
