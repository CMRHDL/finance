const recordset = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECORDSET':
      return [...state, ...action.data]
    case 'EDIT_RECORDSET':
      return [...state]
    case 'DELETE_RECORDSET':
      return state.filter(e => e._id !== action.index)
    default:
      return state
  }
}

export default recordset
