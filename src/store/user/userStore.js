import { create } from 'zustand'
import { RepositoryRemote } from '@services/user'
import { Toast } from '@utils/toast'

export const useUserStore = create((set) => ({
  userInfo: {},
  loadingGetUserInfo: false,
  getCurrentUserInfo: async (onSuccess, onFail) => {
    try {
      set({ loadingGetUserInfo: true })
      const response = await RepositoryRemote.user.getCurrentUserInfo()
      set({ userInfo: response.data }), set({ loadingGetUserInfo: false })
      onSuccess()
    } catch (error) {
      set({ loadingGetUserInfo: false })
      onFail
    }
  },
}))

export const flagStatus = create((set) => ({
  // State to track the user information or other values
  userInfo: {},

  // Flag to track whether user info has been updated
  isUserInfoUpdated: false,

  // Method to update userInfo manually
  updateUserInfo: (newUserInfo) =>
    set({
      userInfo: newUserInfo,
      isUserInfoUpdated: true,
    }),

  // Method to reset the updated status flag
  resetUserInfoUpdated: () => set({ isUserInfoUpdated: false }),
}))
