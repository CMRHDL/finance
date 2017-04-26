const recordsetFilter = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECORDSET_FILTER':
      return [...state.filter(e => e.id !== action.value.id), action.value]
    case 'RESET_RECORDSET_FILTER':
      return []
    case 'REMOVE_RECORDSET_FILTER':
      return state.filter(e => e.id !== action.id)
    default:
      return state
  }
}

export default recordsetFilter
