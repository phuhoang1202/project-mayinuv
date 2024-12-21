import { create } from 'zustand'
import { RepositoryRemote } from '@services/admin'
import { Toast } from '@utils/toast'

export const useCategoryStore = create((set) => ({
  allCategories: [],
  loadingAllCategories: false,
  getAllCate: async (onSuccess, onFail) => {
    try {
      set({ loadingAllCategories: true })
      const response = await RepositoryRemote.category.getAllCategory()
      set({ allCategories: response.data })
      onSuccess()
    } catch (error) {
      onFail
    }
    set({ loadingAllCategories: false })
  },
}))
