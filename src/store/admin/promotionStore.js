import { create } from 'zustand'
import { RepositoryRemote } from '@services/admin'
import { Toast } from '@utils/toast'

export const usePromotionStore = create((set) => ({
  allPromotions: [],
  loadingAllPromotions: false,
  getAllPromotions: async (onSuccess, onFail) => {
    try {
      set({ loadingAllPromotions: true })
      const response = await RepositoryRemote.promotion.getAllPromotions()
      set({ allPromotions: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingAllPromotions: false })
  },
}))
