<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const cartStore = useCartStore()
const { userInfo } = storeToRefs(userStore)
const router = useRouter()
const logout = () => {
  userStore.logOutAction()
  cartStore.clearCart()
  router.replace({ path: '/login' })
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userInfo.token">
          <li>
            <a href="javascript:void(0)"
              ><i class="iconfont icon-user"></i>{{ userInfo.account }}</a
            >
          </li>
          <li>
            <el-popconfirm
              @confirm="logout"
              title="确认退出吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
            >
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
