import { callApi } from '../../apis'

const getAllPrds = () => {
  return callApi(`/api/v1/product-user/find-all`, 'get', null)
}

export const board = { getAllPrds }
