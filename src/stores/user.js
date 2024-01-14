import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/api/user'
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const loginAction = async ({ account, password }) => {
      const res = await login({ account, password })
      userInfo.value = res.result
    }
    return { userInfo, loginAction }
  },
  {
    persist: true
  }
)
