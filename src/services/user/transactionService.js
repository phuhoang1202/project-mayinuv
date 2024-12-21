import { callApi } from '../../apis'

const findByCondition = (payload) => {
  return callApi(`/api/v1/transaction/find-by-condition`, 'post', payload)
}

// Change currency exchange
const exchangeRate = (unit) => {
  return callApi(`/api/v1/currency-exchange/find-all/${unit}`, 'post', null)
}

export const transactionservice = {
  findByCondition,
  exchangeRate,
}
