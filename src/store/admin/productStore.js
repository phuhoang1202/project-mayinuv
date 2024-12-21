import { create } from 'zustand'
import { RepositoryRemote } from '@services/admin'
import { Toast } from '@utils/toast'

export const useProductStore = create((set) => ({
  allPrds: [],
  prdByID: [],
  listImgResponse: [],
  createdPrd: {},
  loadingGetAllPrd: false,
  loadingGetPrdById: false,
  loadingCreatePrd: false,
  loadingDeletePrdById: false,
  loadingUpdatePrd: false,
  getAllPrds: async (onSuccess, onFail) => {
    try {
      set({ loadingGetAllPrd: true })
      const response = await RepositoryRemote.product.getAllPrds()
      set({ allPrds: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingGetAllPrd: false })
  },
  findPrdByConditions: async (form, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loadingGetAllPrd: true })
      const response = await RepositoryRemote.product.filterPrds(form)
      set({ allPrds: response?.data?.content })
      onSuccess(response?.data)
    } catch (error) {
      onFail
    }
    set({ loadingGetAllPrd: false })
  },
  getPrdById: async (id, onSuccess, onFail) => {
    try {
      set({ loadingGetAllPrd: true })
      const response = await RepositoryRemote.product.getPrdById(id)
      set({ prdByID: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingGetAllPrd: false })
  },
  searchPrdByName: async (form, onSuccess, onFail) => {
    try {
      set({ loadingGetAllPrd: true })
      const response = await RepositoryRemote.product.filterPrds(form)
      set({ allPrds: response.data?.content })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingGetAllPrd: false })
  },
  addNewPrd: async (form, onSuccess, onFail) => {
    try {
      set({ loadingCreatePrd: true })
      const response = await RepositoryRemote.product.createNewPrd(form)
      set({ createdPrd: response.data })
      onSuccess(response.data)
    } catch (error) {
      onFail
    }
    set({ loadingCreatePrd: false })
  },
  deletePrdById: async (id, onSuccess, onFail) => {
    try {
      set({ loadingDeletePrdById: true })
      const response = await RepositoryRemote.product.deletePrdById(id)
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingDeletePrdById: false })
  },
  deleteListPrd: async (form, onSuccess, onFail) => {
    try {
      const response = await RepositoryRemote.product.deleteListPrd(form)
      onSuccess()
    } catch (error) {
      onFail
    }
  },
  uploadImage: async (form, onSuccess, onFail) => {
    try {
      const response = await RepositoryRemote.product.uploadPrdImgs(form)
      set({ listImgResponse: response.data })
      onSuccess(response.data)
    } catch (error) {
      onFail
    }
  },
  updateProduct: async (form, onSuccess, onFail) => {
    try {
      set({ loadingUpdatePrd: true })
      const response = await RepositoryRemote.product.updatePrd(form)
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingUpdatePrd: false })
  },
}))
