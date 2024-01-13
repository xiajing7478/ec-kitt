<script setup>
import LayoutNav from '@/views/Layout/Components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/Components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/Components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/Components/LayoutFixed.vue'

import { useCategoryStore } from '@/stores/category'
import { onMounted, ref } from 'vue'

const categoryStore = useCategoryStore()
const data = ref([])
onMounted(async () => {
  await categoryStore.getCategrotList()
  data.value = categoryStore.categrotList
})
</script>
<template>
  <layout-fixed />
  <layout-nav />
  <layout-header :data="data" />
  <router-view />
  <layout-footer />
</template>
