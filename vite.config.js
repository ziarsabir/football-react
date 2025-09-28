import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 👇 Add this:
  server: {
    historyApiFallback: true, // for dev server refreshes
  },

  // 👇 This is for production preview / build
  preview: {
    historyApiFallback: true,
  },
})