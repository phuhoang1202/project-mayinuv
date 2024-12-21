import { create } from 'zustand'
import { RepositoryRemote } from '@services/user'
import { Toast } from '@utils/toast'

export const useCartStore = create((set) => ({
  allPrdsOnCart: [],
  allData: {},
  loadingGetAllPrdsOnCart: false,
  loadingCreateOrderByPrdIds: false,
  loadingDeleteOrderByPrdIds: false,
  createCart: async (form, onSuccess, onFail) => {
    // try {
    //   set({ loadingGetAllPrdsOnCart: true })
    //   const response = await RepositoryRemote.cart.createCart(form)
    //   set({ allPrdsOnCart: response?.data?.content }),
    //     set({ loadingGetAllPrdsOnCart: false }),
    //     set({ allData: response?.data }),
    //     onSuccess(response.data)
    // } catch (error) {
    //   set({ loadingGetAllPrdsOnCart: false })
    //   onFail
    // }
  },
  addToCart: async (form, onSuccess, onFail) => {
    try {
      set({ loadingCreateOrderByPrdIds: true })
      const response = await RepositoryRemote.cart.addToCart(form)
      set({ loadingCreateOrderByPrdIds: false }), onSuccess(response)
    } catch (error) {
      set({ loadingCreateOrderByPrdIds: false })
      onFail
    }
  },
  deleteListOrderByCartIds: async (form, onSuccess, onFail) => {
    try {
      set({ loadingDeleteOrderByPrdIds: true })
      const response = await RepositoryRemote.cart.deleteListOrderByCartIds(form)
      set({ loadingDeleteOrderByPrdIds: false }), onSuccess(response)
    } catch (error) {
      set({ loadingDeleteOrderByPrdIds: false })
      onFail()
    }
  },
  updateCartItem: async (form, onSuccess, onFail) => {
    try {
      set({ loadingUpdateCartItem: true })
      const response = await RepositoryRemote.cart.updateCartItem(form)
      set({ loadingUpdateCartItem: false }), onSuccess()
    } catch (error) {
      set({ loadingUpdateCartItem: false })
      onFail
    }
  },
  getCartByCondition: async (form, onSuccess, onFail) => {
    try {
      set({ loadingGetAllPrdsOnCart: true })
      const response = await RepositoryRemote.cart.getCartByCondition(form)
      set({ allPrdsOnCart: response?.data?.content }),
        set({ loadingGetAllPrdsOnCart: false }),
        set({ allData: response?.data }),
        onSuccess(response.data)
    } catch (error) {
      set({ loadingGetAllPrdsOnCart: false })
      onFail
    }
  },
}))
