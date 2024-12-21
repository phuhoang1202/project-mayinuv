import { create } from 'zustand'
import { RepositoryRemote } from '@services/user'
import { Toast } from '@utils/toast'

export const useCategoryStore = create((set) => ({
  allCategory: [],
  loadingGetAllCategory: false,
  getAllCategory: async (onSuccess, onFail) => {
    try {
      set({ loadingGetAllCategory: true })
      const response = await RepositoryRemote.category.getAllCategory()
      set({ allCategory: response.data }), set({ loadingGetAllCategory: false })
      onSuccess()
    } catch (error) {
      set({ loadingGetAllCategory: false })
      onFail
    }
  },
}))
