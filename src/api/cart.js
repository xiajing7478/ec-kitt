/**
 * 购物车相关
 */

import httpInstance from '@/utils/http'

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新购物车列表
export const findNewCartListAPI = () => {
  return httpInstance({
    url: '/member/cart'
  })
}

// 删除购物车商品
export const deleteCartAPI = (skuIds) => {
  return httpInstance({
    url: `/member/cart`,
    method: 'DELETE',
    data: { ids: skuIds }
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: `/member/cart/merge`,
    method: 'POST',
    data
  })
}
