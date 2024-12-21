import { callApi, callApiUploadAvatar, callApiNoAuthen } from '../../apis'

const getCurrentUserInfo = () => {
  return callApi(`/api/v1/user/current`, 'get', null)
}

// Controller

const uploadAvatar = (payloadBody, token) => {
  const authorization = `Bearer ${token}`
  return callApiUploadAvatar(`/api/v1/user/upload-avatar`, 'post', payloadBody, authorization)
}

const changePassswordUser = (payloadBody, token) => {
  const authorization = `Bearer ${token}`
  return callApi(`/api/v1/user/change-password`, 'post', payloadBody, authorization)
}

const postFormUser = (payloadBody, token) => {
  const authorization = `Bearer ${token}`
  return callApi(`/api/v1/user/update-profile`, 'post', payloadBody, authorization)
}

export const user = {
  getCurrentUserInfo,
  uploadAvatar,
  changePassswordUser,
  postFormUser,
}
