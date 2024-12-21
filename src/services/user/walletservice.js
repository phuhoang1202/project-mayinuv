import { callApi } from '../../apis';

const getInfoWallet = () => {
    return callApi(`/api/v1/wallet/get-wallet`, 'get', {})
}

export const walletservice = {
    getInfoWallet
}