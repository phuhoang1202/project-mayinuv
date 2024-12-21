import { create } from 'zustand'
import { RepositoryRemote } from '@services/user'
import { Toast } from '@utils/toast'

export const useCouponStore = create((set) => ({
  allCoupon: [],
  allData: {},
  loadingGetAllCoupon: false,
  loadingCreateOrderByPrdIds: false,
  loadingDeleteOrderByPrdIds: false,
  // createCart: async (form, onSuccess, onFail) => {
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
  // },
  // createListOrderByPrdIds: async (form, onSuccess, onFail) => {
  //   try {
  //     set({ loadingCreateOrderByPrdIds: true })
  //     const response = await RepositoryRemote.cart.createListOrderByPrdIds(form)
  //     set({ loadingCreateOrderByPrdIds: false }), onSuccess()
  //   } catch (error) {
  //     set({ loadingCreateOrderByPrdIds: false })
  //     onFail
  //   }
  // },
  // deleteListOrderByPrdIds: async (form, onSuccess, onFail) => {
  //   try {
  //     set({ loadingDeleteOrderByPrdIds: true })
  //     const response = await RepositoryRemote.cart.deleteListOrderByPrdIds(form)
  //     set({ loadingDeleteOrderByPrdIds: false }), onSuccess()
  //   } catch (error) {
  //     set({ loadingDeleteOrderByPrdIds: false })
  //     onFail
  //   }
  // },
  getAllCoupon: async (form, onSuccess, onFail) => {
    try {
      set({ loadingGetAllCoupon: true })
      const response = await RepositoryRemote.coupon.getAllCoupon(form)
      set({ allCoupon: response?.data?.content }), set({ loadingGetAllCoupon: false }), onSuccess(response.data)
    } catch (error) {
      set({ loadingGetAllCoupon: false })
      onFail
    }
  },
}))
