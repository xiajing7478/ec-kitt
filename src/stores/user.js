import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/api/user'
import { mergeCartAPI } from '@/api/cart'
import { useCartStore } from './cartStore'
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const cartStore = useCartStore()
    const loginAction = async ({ account, password }) => {
      const res = await login({ account, password })
      userInfo.value = res.result

      //合并购物车操作
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            count: item.count,
            selected: item.selected
          }
        })
      )
      cartStore.updeNewList()
    }
    const logOutAction = () => {
      userInfo.value = {}
    }

    return { userInfo, loginAction, logOutAction }
  },
  {
    persist: true
  }
)
