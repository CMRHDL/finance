import sortBy from 'ramda/src/sortBy'
import prop from 'ramda/src/prop'

const addedRecordset = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ADDEDRECORDSET':
      return sortBy(prop('code'), [...state, action.value])
    case 'EDIT_ADDEDRECORDSET':
      return [...state.slice(0, action.value), ...state.slice(action.value + 1)]
    case 'RESET_ADDEDRECORDSET':
      return []
    default:
      return state
  }
}

export default addedRecordset
