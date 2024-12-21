import { callApi } from '../../apis'

const getAllCategory = () => {
  return callApi(`/api/v1/un-auth/find-all-category`, 'get', null)
}

export const category = {
  getAllCategory,
}
