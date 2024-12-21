import { callApi, callApiNoAuthen } from '../../apis'

const getAllPrds = () => {
  return callApi(`/api/v1/product-user/find-all`, 'get', null)
}

const getPrdById = (id) => {
  return callApi(`/api/v1/product-user/find-by-id/${id}`, 'get', null)
}

const wishListPrd = (form) => {
  return callApi(`/api/v1/wishlist/tick-wishlist`, 'post', form)
}

const getAllWishList = (form) => {
  return callApi(`/api/v1/wishlist/find-all`, 'post', form)
}

const filterPrds = (form) => {
  return callApi(`/api/v1/product-user/find-by-condition`, 'post', form)
}

const getProductByIdAndUserId = (payload) => {
  return callApi(`/api/v1/product-user/detail-product`, 'post', payload)
}

const getProductByType = (payload) => {
  return callApiNoAuthen(`/api/v1/product-user/find-by-type`, 'post', payload)
}

const getProductByAllParent = () => {
  return callApiNoAuthen(`/api/v1/un-auth/find-all-category`, 'get', null)
}

const getProductFindByType = (form) => {
  return callApiNoAuthen(`/api/v1/product-user/find-by-type`, 'post', form)
}

export const product = {
  getAllPrds,
  filterPrds,
  getPrdById,
  wishListPrd,
  getAllWishList,
  getProductByIdAndUserId,
  getProductByType,
  getProductByAllParent,
  getProductFindByType,
}
