import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/WebSite_Bikes/',
  plugins: [react()]
})
