const addedRecordset = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ADDEDRECORDSET':
      return [...state, action.value]
    case 'REMOVE_ADDEDRECORDSET':
      return [...state.slice(0, action.value), ...state.slice(action.value + 1)]
    case 'RESET_ADDEDRECORDSET':
      return []
    default:
      return state
  }
}

export default addedRecordset
