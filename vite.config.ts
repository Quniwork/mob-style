import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000KB
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
})
