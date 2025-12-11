import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  const port = Number(env.PORT) || 3000
  const apiUrl = env.API_URL || env.api_url || 'https://111ya.cc'

  return {
    // Expose env variables to client
    define: {
      __APP_NAME__: JSON.stringify(env.APP_NAME || env.app_name || 'Casino'),
      __APP_VERSION__: JSON.stringify(env.APP_VERSION || 'v0.0.0'),
    },
    server: {
      host: true, // Display Network IP
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
