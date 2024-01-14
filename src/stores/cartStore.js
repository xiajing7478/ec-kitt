import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const addCart = (goods) => {
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

    const deleteCart = (skuId) => {
      // 删除购物车操作
      // 思路：通过匹配传递过来的skuId能不能在cartList中找到，找到了就是添加过
      const index = cartList.value.findIndex((item) => skuId === item.skuId)
      if (index !== -1) {
        cartList.value.splice(index, 1)
      }
    }
    return {
      cartList,
      addCart,
      deleteCart
    }
  },
  {
    persist: true
  }
)
