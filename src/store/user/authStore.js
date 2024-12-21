import { create } from 'zustand'
import { RepositoryRemote } from '@services/user'
import { Toast } from '@utils/toast'

export const useAuthStore = create((set) => ({
  tokenInfo: {},
  loadingGetOtp: false,
  loadingVerifyOtp: false,
  getOTP: async (form, onSuccess, onFail) => {
    try {
      set({ loadingGetOtp: true })
      onSuccess()
      set({ loadingGetOtp: false })
    } catch (error) {
      set({ loadingGetOtp: false })
      onFail()
    }
    set({ loadingGetOtp: false })
  },
  verifyOTP: async (form, onSuccess, onFail) => {
    try {
      set({ loadingVerifyOtp: true })
      onSuccess()
      set({ loadingVerifyOtp: false })
    } catch (error) {
      onFail()
    }
    set({ loadingVerifyOtp: false })
  },
}))
