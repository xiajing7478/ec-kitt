<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/subCategory'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '@/components/GoodsItem/index.vue'
const route = useRoute()
const filterData = ref({})
const goodList = ref([])
const goodsParams = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  filterData.value = res.result
}

const getGoodsList = async (params) => {
  const res = await getSubCategoryAPI(params)
  goodList.value = res.result.items
}

const tabChange = () => {
  goodsParams.value.page = 1
  getGoodsList(goodsParams.value)
}

const disabled = ref(false)
const loadMore = async () => {
  goodsParams.value.page++
  const res = await getSubCategoryAPI(goodsParams.value)
  goodList.value = [...goodList.value, ...res.result.items]
  if (res.result.items.length == 0) {
    disabled.value = true
  }
  // console.log('loadMore')
}

onMounted(() => getFilterData())
onMounted(() => getGoodsList(goodsParams.value))
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }"
          >{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs @tab-change="tabChange" v-model="goodsParams.sortField">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        infinite-scroll-delay="300"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表-->
        <goods-item v-for="good in goodList" :good="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
