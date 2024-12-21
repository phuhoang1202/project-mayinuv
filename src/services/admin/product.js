import { callApi, callApiImage } from '../../apis'

const getAllPrds = () => {
  return callApi(`/api/v1/product-user/find-all`, 'get', null)
}

const getPrdById = (id) => {
  return callApi(`/api/v1/product-user/find-by-id/${id}`, 'get', null)
}

const createNewPrd = (form) => {
  return callApi(`/api/v1/product/create`, 'post', form)
}

const deleteListPrd = (form) => {
  return callApi(`/api/v1/product/delete-by-status`, 'post', form)
}

const deletePrdById = (payload) => {
  return callApi(`/api/v1/product/update-status`, 'post', payload)
}

const filterPrds = (form) => {
  return callApi(`/api/v1/product-user/find-by-condition`, 'post', form)
}

const updatePrd = (form) => {
  return callApi(`/api/v1/product/update`, 'post', form)
}

const uploadPrdImgs = (form) => {
  return callApiImage(`/api/v1/product/upload-image`, 'post', form)
}

const uploadPrdImgsDetail = (form) => {
  return callApiImage(`/api/v1/product/upload-image-detail`, 'post', form)
}

const uploadDescription = (form) => {
  return callApi(`/api/v1/product/update-description`, 'post', form)
}

// NEW
const getProductByCondition = (form) => {
  return callApi(`/api/v1/product-user/find-by-condition`, 'post', form)
}

// const getProductByCondition = (form) => {
//   return callApi(`/api/v1/product-user/find-by-type`, 'post', form)
// }

const getProductById = (idProduct) => {
  return callApi(`/api/v1/product-user/find-by-id/${idProduct}`, 'get', null)
}

// Update Product
const updateProduct = (form) => {
  return callApi(`/api/v1/product/update`, 'post', form)
}

const importFile = (formData) => {
  return callApiImage(`/api/v1/product/import-product`, 'post', formData)
}

export const product = {
  getAllPrds,
  filterPrds,
  getPrdById,
  createNewPrd,
  deleteListPrd,
  deletePrdById,
  updatePrd,
  uploadPrdImgs,
  uploadPrdImgsDetail,
  uploadDescription,

  getProductByCondition,
  getProductById,
  updateProduct,
  importFile,
}
