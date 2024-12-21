import { create } from 'zustand'
import { RepositoryRemote } from '@services/user'
import { Toast } from '@utils/toast'

export const useProductStore = create((set) => ({
  allPrds: [],
  prdByID: {},
  allPrdSortByCate: [],
  allDataPrdSortByCate: {},
  wishListPrds: [],
  loadingGetAllPrd: false,
  loadingGetPrdById: false,
  loadingFilterPrd: false,
  loadingPrdByCategory: false,
  loadingWisPrd: false,
  loadingGetWisPrd: false,
  getAllPrds: async (form, onSuccess, onFail) => {
    try {
      set({ loadingGetOtp: true })
      const response = await RepositoryRemote.product.getAllPrds()
      set({ allPrds: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingGetOtp: false })
  },
  getPrdById: async (id, onSuccess, onFail) => {
    try {
      set({ loadingGetPrdById: true })
      const response = await RepositoryRemote.product.getPrdById(id)
      set({ prdByID: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingGetPrdById: false })
  },
  getProductByIdAndUserId: async (payload, onSuccess, onFail) => {
    try {
      set({ loadingGetPrdById: true })
      const response = await RepositoryRemote.product.getProductByIdAndUserId(payload)
      set({ prdByID: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingGetPrdById: false })
  },
  tickWishList: async (form, onSuccess, onFail) => {
    try {
      set({ loadingWisPrd: true })
      const response = await RepositoryRemote.product.wishListPrd(form)
      onSuccess(
        Toast.success(response?.data === true ? 'Product added to wishlist successfully.' : 'Fail to add to wish list'),
        set({ loadingWisPrd: false }),
      )
    } catch (error) {
      onFail()
    }
    set({ loadingWisPrd: false })
  },
  getAllWishList: async (form, onSuccess, onFail) => {
    try {
      set({ loadingGetWisPrd: true })
      const response = await RepositoryRemote.product.getAllWishList(form)
      set({ wishListPrds: response.data.content })
      set({ allDataPrdSortByCate: response.data })
      set({ loadingGetWisPrd: false })
      onSuccess(response.data)
    } catch (error) {
      onFail
    }
    set({ loadingGetWisPrd: false })
  },
  filterPrds: async (form, onSuccess, onFail) => {
    try {
      set({ loadingFilterPrd: true })
      const response = await RepositoryRemote.product.filterPrds(form)
      // set({ allPrds: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingFilterPrd: false })
  },
  getProductFindByType: async (form, onSuccess, onFail) => {
    try {
      set({ loadingPrdByCategory: true })
      const response = await RepositoryRemote.product.getProductFindByType(form)
      set({ loadingPrdByCategory: false })
      set({ allPrdSortByCate: response.data?.content })
      onSuccess(response.data)
    } catch (error) {
      onFail
    }
    set({ loadingPrdByCategory: false })
  },
}))
