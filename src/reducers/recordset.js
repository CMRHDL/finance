const recordset = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECORDSET':
      return [...state, ...action.data]
    default:
      return state
  }
}

export default recordset
