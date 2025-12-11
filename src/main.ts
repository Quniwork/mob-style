import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 設定文件標題
document.title = `${__APP_NAME__} | 頂級線上遊戲平台`
console.log(`🚀 ${__APP_NAME__} ${__APP_VERSION__} Initialized (Vue 3)`)
