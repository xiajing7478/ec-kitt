/**
 * createRouter  创建router实例
 * createWebHistory  创建history模式路由
 */
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '@/views/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/category/:id',
          name: 'category',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: '/category/sub/:id',
          name: 'subCategory',
          component: () => import('@/views/SubCategroy/index.vue')
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: '/cartList',
          name: 'cartList',
          component: () => import('@/views/CartList/index.vue')
        },
        {
          path: '/settlement',
          name: 'settlement',
          component: () => import('@/views/Settlement/index.vue')
        },
        {
          path: '/pay',
          name: 'pay',
          component: () => import('@/views/Pay/index.vue')
        },
        {
          path: '/paycallback',
          name: 'paycallback',
          component: () => import('@/views/Pay/payBack.vue')
        },
        {
          path: '/sku',
          name: 'sku',
          component: () => import('@/views/Sku/index.vue')
        },
        {
          path: '/member',
          name: 'member',
          component: () => import('@/views/Member/index.vue'),
          redirect: '/member/user',
          children: [
            {
              path: 'user',
              name: 'memberUser',
              component: () => import('@/views/Member/User/index.vue')
            },
            {
              path: 'order',
              name: 'order',
              component: () => import('@/views/Member/User/userOrder.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
