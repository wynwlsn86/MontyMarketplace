export const __SetToken = token => localStorage.setItem('token', token)

export const __GetToken = () => localStorage.getItem('token')

export const __ClearToken = () => localStorage.removeItem('token')
