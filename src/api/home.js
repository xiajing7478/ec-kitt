import httpInstance from '@/utils/http'

export function getHomeAPI() {
  return httpInstance({
    url: '/home/banner'
  })
}
