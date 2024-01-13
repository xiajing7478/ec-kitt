import httpInstance from '@/utils/http'

export function testApi() {
  return httpInstance({
    url: 'home/category/head'
  })
}
