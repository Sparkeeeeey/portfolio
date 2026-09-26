import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://sparkeeeeey.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
