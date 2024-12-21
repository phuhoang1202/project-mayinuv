import { callApi, callApiNoAuthen } from '../../apis'

const getOneCoupon = (id) => {
  return callApiNoAuthen(`/api/v1/un-auth/coupon/find-by-id/${id}`, 'post', null)
}

const getAllCoupon = (form) => {
  return callApiNoAuthen(`/api/v1/un-auth/find-all-coupon`, 'post', form)
}

const getAllCouponStatus = () => {
  return callApiNoAuthen(`/api/v1/un-auth/find-all-coupon-status`, 'get', null)
}

// const createListOrderByPrdIds = (form) => {
//   return callApi(`/api/v1/cart/create-list-cart`, 'post', form)
// }

// const deleteListOrderByPrdIds = (form) => {
//   return callApi(`/api/v1/cart/delete-list-cart`, 'post', form)
// }

export const coupon = {
  getOneCoupon,
  getAllCoupon,
  getAllCouponStatus,
}
