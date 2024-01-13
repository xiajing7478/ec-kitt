import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { testApi } from '@/api/testApi'

import App from './App.vue'
import router from './router'

const app = createApp(App)

testApi().then((res) => {
  console.log(res)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
