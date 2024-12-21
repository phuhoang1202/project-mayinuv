import { callApi, callApiAuthen } from '../../apis'

const getAllPromotions = async () => {
  return callApi(`/api/v1/promotion/find-all-active`, 'get', null)
}

export const getPromotion = async () => {
  return callApiAuthen(`/api/v1/promotion/find-all`, 'get', null)
}

export const postPromotion = async (payloadBody) => {
  return callApiAuthen(`/api/v1/promotion/create`, 'post', payloadBody)
}

export const updatePromotion = async (payloadBody) => {
  return callApiAuthen(`/api/v1/promotion/update`, 'post', payloadBody)
}

export const deletePromotion = async (id, payloadBody) => {
  return callApiAuthen(`/api/v1/promotion/delete/${id}`, 'post', payloadBody)
}

export const deleteSelectedPromotion = async (payloadBody) => {
  return callApiAuthen(`/api/v1/promotion/delete-selected`, 'post', payloadBody)
}

export const panigationPromotion = async (payloadBody) => {
  return callApiAuthen(`/api/v1/promotion/find-by-condition`, 'post', payloadBody)
}

export const searchPromotion = async (payloadBody) => {
  return callApiAuthen(`/api/v1/promotion/find-by-condition`, 'post', payloadBody)
}

export const promotion = {
  getAllPromotions,
  getPromotion,
  postPromotion,
  updatePromotion,
  deletePromotion,
  deleteSelectedPromotion,
  panigationPromotion,
  searchPromotion,
}
