import { defineConfig } from 'vite'


// https://vite.dev/config/

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://13.202.193.4:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});


