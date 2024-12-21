import { callApi } from '../../apis';

const create = (payload) => {
    return callApi(`/api/v1/transaction/create`, 'post', payload);
}

export const dspCashIn = {
   create
}