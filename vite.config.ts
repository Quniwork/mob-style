import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig(({ mode }) => {
  // 根據 mode 載入環境變數
  // 第三個參數設為 '' 表示載入所有環境變數，不限於 VITE_ 前綴
  const env = loadEnv(mode, process.cwd(), '')

  const port = Number(env.PORT) || 3000
  const apiUrl = env.API_URL || env.api_url || 'https://111ya.cc'

  return {
    plugins: [vue(), tailwindcss()],
    // 將環境變數暴露給客戶端
    define: {
      __APP_NAME__: JSON.stringify(env.APP_NAME || env.app_name || 'Casino'),
      __APP_VERSION__: JSON.stringify(env.APP_VERSION || 'v0.0.0'),
    },
    server: {
      host: true,
      port: port,
      open: true,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  }
})
