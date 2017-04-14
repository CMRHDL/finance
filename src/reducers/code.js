const code = (state = { year: 2017, number: 1, page: 1, position: 1 }, action) => {
  switch (action.type) {
    case 'UPDATE_CODE':
      return action.code
    default:
      return state
  }
}

export default code
