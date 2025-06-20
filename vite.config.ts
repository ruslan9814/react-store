import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // или '/название-папки/' если деплоишь в поддиректорию
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
