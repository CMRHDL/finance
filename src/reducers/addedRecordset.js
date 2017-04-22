import moment from 'moment'

const addedRecordset = (
  state = [{
    amount: -5,
    attribution: 'Miete',
    date: moment().toDate(),
    description: 'Miete Januar 2017',
    isIncome: true,
  }],
  action
) => {
  switch (action.type) {
    case 'ADD_ADDEDRECORDSET':
      return [ ...state, action.value ]
    case 'REMOVE_ADDEDRECORDSET':
      return [
        ...state.slice(0, action.value),
        ...state.slice(action.value + 1),
      ]
    default:
      return state
  }
}

export default addedRecordset
