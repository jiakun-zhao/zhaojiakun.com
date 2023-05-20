import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS(),
    Pages(),
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
  publicDir: 'src/public',
  server: { host: true },
})
