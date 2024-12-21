import { callApi } from '../../apis'

export const getAllTransaction = (bodyPayload) => {
  return callApi(`/api/v1/admin/transaction/get-all-transaction`, 'post', bodyPayload)
}

export const getDetailTransaction = (id) => {
  return callApi(`/api/v1/admin/transaction/details/${id}`, 'post', null)
}

export const updateStatus = (bodyPayload) => {
  return callApi(`/api/v1/order/update-status`, 'post', bodyPayload)
}

export const transaction = {
  getAllTransaction,
  getDetailTransaction,
  updateStatus,
}
