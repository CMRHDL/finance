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

export const updateSettingsAttributionInput = (value) => ({
  type: 'UPDATE_SETTINGS_ATTRIBUTION_INPUT',
  value
})

export const addSettingsAttributionIncome = (value) => ({
  type: 'ADD_SETTINGS_ATTRIBUTION_INCOME',
  value
})

export const addSettingsAttributionExpense = (value) => ({
  type: 'ADD_SETTINGS_ATTRIBUTION_EXPENSE',
  value
})
