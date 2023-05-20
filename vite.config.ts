import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  publicDir: 'src/public',
  plugins: [
    Vue(),
    UnoCSS(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => id.includes('node_modules') ? 'lib' : undefined,
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./contents', import.meta.url)),
    },
  },
  server: {
    host: true,
  },
})
