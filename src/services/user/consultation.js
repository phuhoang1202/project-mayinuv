import { callApi, callApiImage } from '../../apis';

const create = (payload) => {
    return callApi(`/api/v1/consultation/create`, 'post', payload);
}

const findByCondition = (payload) => {
    return callApi(`/api/v1/consultation/find-by-condition`, 'post', payload);
}

const replyMessage = (payload) => {
    return callApi(`/api/v1/consultation/reply-message`, 'post', payload);
}

const editMessage = (payload) => {
    return callApi(`/api/v1/consultation/edit-message`, 'post', payload);
}

const uploadImages = (formData) => {
    return callApiImage(`/api/v1/consultation/upload-image`, 'post', formData)
}

const findById = (consultationId) => {
    return callApi(`/api/v1/consultation/find-by-id/${consultationId}`, "post", {})
}

const deleteConsultationById = (consultationId) => {
    return callApi(`/api/v1/consultation/delete/${consultationId}`, 'post', {})
}
export const consultation = {
    create,
    findByCondition,
    replyMessage,
    findById,
    uploadImages,
    deleteConsultationById,
    editMessage
}