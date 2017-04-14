export const login = () => ({
  type: 'LOGIN',
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const updateLoginError = (message) => ({
  type: 'UPDATE_LOGIN_ERROR',
  message
})

export const updateCode = (code) => ({
  type: 'UPDATE_CODE',
  code
})
