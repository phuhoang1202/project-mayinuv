import { callApi } from '../../apis'

export const getAllUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/user/get-all`, 'post', bodyPayload)
}

export const createUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/create`, 'post', bodyPayload)
}

export const updateUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/update`, 'post', bodyPayload)
}

export const statusEnableUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/update-enable`, 'post', bodyPayload)
}

export const searchUser = (bodyPayload) => {
  return callApi(`/api/v1/admin/find-by-condition`, 'post', bodyPayload)
}

export const member = { getAllUsers, createUsers, updateUsers, statusEnableUsers, searchUser }
