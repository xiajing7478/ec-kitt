import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryAPI } from '@/api/layout.js'
export const useCategoryStore = defineStore('category', () => {
  const categrotList = ref([])
  const getCategrotList = async () => {
    const res = await getCategoryAPI()
    categrotList.value = res.result
  }

  return { categrotList, getCategrotList }
})
