import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, deleteCartAPI } from '@/api/cart'
export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    const addCart = async (goods) => {
      if (isLogin.value) {
        // 登录了 - 调用接口
        const { skuId, count } = goods
        await insertCartAPI({
          skuId,
          count
        })
        const res = await findNewCartListAPI()
        cartList.value = res.result
      } else {
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          item.count += 1
        } else {
          cartList.value.push(goods)
        }
      }
    }

    const deleteCart = async (skuId) => {
      if (isLogin.value) {
        await deleteCartAPI([skuId])
        const res = await findNewCartListAPI()
        cartList.value = res.result
      } else {
        // 删除购物车操作
        // 思路：通过匹配传递过来的skuId能不能在cartList中找到，找到了就是添加过
        const index = cartList.value.findIndex((item) => skuId === item.skuId)
        if (index !== -1) {
          cartList.value.splice(index, 1)
        }
      }
    }

    const totalCount = computed(() =>
      cartList.value.reduce((total, item) => {
        return total + item.count
      }, 0)
    )

    const totalPrice = computed(() =>
      cartList.value.reduce((total, item) => {
        return total + item.count * item.price
      }, 0)
    )
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => {
          return total + item.count
        }, 0)
    )

    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => {
          return total + item.count * item.price
        }, 0)
    )

    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => skuId === item.skuId)
      if (item) {
        item.selected = selected
      }
    }

    const allCheck = (selected) => {
      cartList.value.forEach((item) => {
        item.selected = selected
      })
    }

    const isAll = computed(() => {
      return cartList.value.every((item) => item.selected)
    })

    // 清除购物车
    const clearCart = () => {
      cartList.value = []
    }

    const updeNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }

    return {
      cartList,
      addCart,
      deleteCart,
      totalCount,
      totalPrice,
      singleCheck,
      isAll,
      allCheck,
      selectedCount,
      selectedPrice,
      clearCart,
      updeNewList
    }
  },
  {
    persist: true
  }
)
