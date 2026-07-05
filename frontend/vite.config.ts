import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/eventi': 'http://localhost:8080',
      '/artisti': 'http://localhost:8080',
      '/organizzatori': 'http://localhost:8080',
      '/candidature': 'http://localhost:8080',
    }
  }
})
