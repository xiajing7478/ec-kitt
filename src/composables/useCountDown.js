import { computed, onUnmounted, ref } from 'vue'
export const useCountDown = (time) => {
  const timeLeft = ref(time)
  const timer = setInterval(() => {
    timeLeft.value--
  }, 1000)
  const timeLeftStr = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes}分${seconds < 10 ? '0' + seconds : seconds}秒`
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
  return { timeLeftStr }
}
