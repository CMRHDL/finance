const loginError = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN_ERROR':
      return action.message || ''
    default:
      return state
  }
}

export default loginError
