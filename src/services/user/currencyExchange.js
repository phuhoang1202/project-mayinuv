import { callApi } from '../../apis';

const findAll = (unit) => {
    return callApi(`/api/v1/currency-exchange/find-all/${unit}`, 'post', {})
}

export const currencyExchange = {
    findAll
}