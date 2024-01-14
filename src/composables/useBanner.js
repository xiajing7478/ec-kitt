import { getHomeAPI } from '@/api/home'
import { onMounted, ref } from 'vue'
export const useBanner = () => {
  const bannerList = ref([])
  const getBannerList = async () => {
    const res = await getHomeAPI()
    bannerList.value = res.result
  }
  onMounted(() => getBannerList())
  return { bannerList, getBannerList }
}
