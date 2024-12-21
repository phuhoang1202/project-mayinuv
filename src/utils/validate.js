export const validateEmail = (email) => {
  if (email === '') return true

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\+?[0-9]{10}$/

  return regex.test(phoneNumber)
}

export const validateReferralPhoneNumber = (referralPhoneNumber) => {
  if (referralPhoneNumber === '') return true
  const regex = /^\+?[0-9]{10,15}$/

  return regex.test(referralPhoneNumber)
}

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return Promise.reject(new Error('Password must be at least 6 characters!'))
  }

  if (password.length > 24) {
    return Promise.reject(new Error('Password must be less than 25 characters!'))
  }

  if (!/[A-Z]/.test(password)) {
    return Promise.reject(new Error('Password must contain at least one uppercase letter!'))
  }

  if (!/[a-z]/.test(password)) {
    return Promise.reject(new Error('Password must contain at least one lowercase letter!'))
  }

  if (!/[0-9]/.test(password)) {
    return Promise.reject(new Error('Password must contain at least one digit!'))
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return Promise.reject(new Error('Password must contain at least one special character!'))
  }

  return Promise.resolve(true)
}
