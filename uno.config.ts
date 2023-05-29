import { readFileSync } from 'node:fs'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import type { Theme } from 'unocss/preset-mini'
import presetColors from 'unocss-preset-colors'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig<Theme>({
  presets: [
    presetUno({ dark: 'media' }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' },
      autoInstall: true,
      collections: {
        u: {
          favicon: () => readFileSync('src/public/favicon.svg', 'utf-8'),
        },
      },
    }),
    presetColors({
      colors: {
        accent: '#6054ba',

        text: {
          primary: { light: '#000', dark: '#f2f2f2' },
          secondary: { light: '#767676', dark: '#898989' },
          thirdly: { light: '#bababa', dark: '#444' },
        },

        bg: {
          primary: { light: '#fff', dark: '#111' },
          secondary: { light: '#f2f2f2', dark: '#191919' },
        },

        border: {
          primary: { light: '#ddd', dark: '#333' },
          secondary: { light: '#eee', dark: '#222' },
        },
      },
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    fontFamily: {
      sans: 'Inter, PingFang TC, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
      mono: 'Input, Input Mono, DM Mono, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;',
    },
    animation: {
      keyframes: {
        'flash-header-tip': '{ 0% {opacity:0} 40% {opacity:1} 100% {opacity:0} }',
      },
    },
    media: {
      motion_ok: '(prefers-reduced-motion: no-preference)',
    },
  },
  rules: [
    [/^slide-enter-(\d+)$/, ([, n]) => ({ '--enter-stage': `${n} !important` })],
  ],
  shortcuts: {
    'base-item-style': 'w-full max-w-3xl px-8 mx-auto font-sans tracking-wider [&_code]:font-mono',
    'safe-bottom': 'pb-[constant(safe-area-inset-bottom)] pb-[env(safe-area-inset-bottom)]',
  },
})
