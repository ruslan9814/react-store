import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // относительные пути, чтобы не было проблем с загрузкой ресурсов
  plugins: [react()],
  build: {
    outDir: 'dist', // папка с билдом
  },
 
})
