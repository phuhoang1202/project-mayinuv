import { callApi, callApiNoAuthen, callApiLogin, callApiAuthen } from '../../apis'
import { constants as c } from '@constants'

export const loginApi = async (username, password) => {
  const payloadBody = new URLSearchParams({
    username: username,
    password: password,
    grant_type: 'password',
  })
  const contentType = 'application/x-www-form-urlencoded'
  const authorization = `Basic ${btoa(`${c.LOGIN_CLIENTID}:${c.LOGIN_CLIENTSECRET}`)}`

  return callApiLogin(`/oauth/token`, 'post', payloadBody, contentType, authorization)
}

export const socialLoginApi = async (payloadBodySocial, token) => {
  const authorization = `Bearer ${token}`

  return callApiLogin(`/api/v1/user/social`, 'post', payloadBodySocial, null, authorization)
}

export const registerApi = async (payloadBodyRegister) => {
  return callApiNoAuthen(`/signup/registration`, 'post', payloadBodyRegister, null, null)
}

export const verifyOTP = async (payloadVerifi) => {
  return callApiNoAuthen(`/signup/verify`, 'post', payloadVerifi, null, null)
}

export const registerForm = async (payloadBody) => {
  return callApiNoAuthen(`/api/v1/admin/update`, 'post', payloadBody, null, null)
}

export const logOut = async () => {
  return callApiNoAuthen(`/oauth/logout`, 'delete', null, null, null)
}

export const logOutUser = async () => {
  return callApiNoAuthen(`/oauth/logout`, 'delete', null, null, null)
}

export const forgotPass = async (payloadBody) => {
  return callApiNoAuthen(`/signup/forgot-password`, 'post', payloadBody, null, null)
}

export const updatePass = async (payloadBody) => {
  return callApiNoAuthen(`/signup/user-update-password`, 'post', payloadBody, null, null)
}

export const auth = {
  loginApi,
  socialLoginApi,
  registerApi,
  verifyOTP,
  registerForm,
  forgotPass,
  logOut,
  updatePass,
  logOutUser,
}
