import { callApi, callApiNoAuthen } from '../../apis'

const createCart = (form) => {
  return callApi(`/api/v1/cart/create`, 'post', form)
}

const getCartByCondition = (form) => {
  return callApi(`/api/v1/cart/find-by-condition`, 'post', form)
}

const createCartOrder = (bodyPayload) => {
  return callApiNoAuthen(`/api/v1/cart/create-cart`, 'post', bodyPayload)
}

const createInfoOrder = (bodyPayload) => {
  return callApiNoAuthen(`/api/v1/order/get-info`, 'post', bodyPayload)
}

const addToCart = (form) => {
  return callApi(`/api/v1/cart/create-cart`, 'post', form)
}

const deleteListOrderByCartIds = (form) => {
  return callApi(`/api/v1/cart/delete-list-cart`, 'post', form)
}

const updateCartItem = (form) => {
  return callApi(`/api/v1/cart/update-cart-item`, 'post', form)
}

const updateQuantityCartItemAttribute = (form) => {
  return callApi(`/api/v1/cart/update-quantity-cart-item-option`, 'post', form)
}

const deleteCartItemAttribute = (id) => {
  return callApi(`/api/v1/cart/delete-cart-item-attribute/${id}`, 'post', null)
}

const deleteListCartItem = (bodyPayload) => {
  return callApi(`/api/v1/cart/delete-list-cart`, 'post', bodyPayload)
}

// Order
const getInfoOrder = (bodyPayload) => {
  return callApi(`/api/v1/order/get-info-order`, 'post', bodyPayload)
}

const createOrder = (bodyPayload) => {
  return callApi(`/api/v1/order/create`, 'post', bodyPayload)
}

const orderFindByCondition = (bodyPayload) => {
  return callApi(`/api/v1/order/find-by-condition`, 'post', bodyPayload)
}

const cancelOrder = (id) => {
  return callApi(`/api/v1/order/cancel-order/${id}`, 'post', null)
}

const orderDetail = (bodyPayload) => {
  return callApi(`/api/v1/order/find-by-id`, 'post', bodyPayload)
}

// shipping address
const getShippingAddress = () => {
  return callApi(`/api/v1/shipping-address/find-all`, 'post', null)
}

const createShippingAddress = (bodyPayload) => {
  return callApi(`/api/v1/shipping-address/create`, 'post', bodyPayload)
}

const deleteShippingAddress = (id) => {
  return callApi(`/api/v1/shipping-address/delete/${id}`, 'post', null)
}

const updateShippingAddress = (bodyPayload) => {
  return callApi(`/api/v1/shipping-address/update`, 'post', bodyPayload)
}

// Get address
const getAddress = (bodyPayload) => {
  return callApiNoAuthen(`/api/v1/un-auth/get-location`, 'post', bodyPayload)
}

export const cart = {
  createCart,
  getCartByCondition,
  createCartOrder,
  createInfoOrder,
  addToCart,
  deleteListOrderByCartIds,
  updateCartItem,
  updateQuantityCartItemAttribute,
  deleteCartItemAttribute,
  deleteListCartItem,
  getInfoOrder,
  createOrder,
  orderFindByCondition,
  cancelOrder,
  orderDetail,
  getShippingAddress,
  createShippingAddress,
  deleteShippingAddress,
  updateShippingAddress,
  getAddress,
}
