import { callApi } from '../../apis'

export const exportExcelTransaction = () => {
    return callApi(`/api/v1/admin/transaction/export-file`, 'post', {});
}

export const exportExcelUser = () => {
    return callApi('/api/v1/admin/user/export-file', 'post', {})
}

export const downFileExcel = (filename, accessToken) => {
    return callApi(`/download-file/${filename} + "?access_token=${accessToken}`)
}
export const exportService  = {
    exportExcelTransaction,
    exportExcelUser,
    downFileExcel
}