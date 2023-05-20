import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import type { Theme } from 'unocss/preset-mini'

export default defineConfig<Theme>({
  presets: [
    presetUno({ dark: 'media', preflight: false }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' },
    }),
  ],
  theme: {
    fontFamily: {
      sans: 'DM Mono, PingFangTC, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
      mono: 'Input, Input Mono, DM Mono, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
    },
    colors: {
      accent: '#6054ba',
    },
  },
  shortcuts: {
    'text-primary': 'text-black dark:text-white',
    'text-secondary': 'text-#767676 dark:text-#898989',
    'text-thirdly': 'text-#bababa dark:text-#444',

    'bg-primary': 'bg-white dark:bg-black',
    'bg-secondary': 'bg-#f2f2f2 dark:bg-#191919',

    'border-primary': 'border-#ddd dark:border-#333 border-solid border-0',
    'border-secondary': 'border-#eee dark:border-#222 border-solid border-0',

    'body-primary': 'text-primary bg-primary font-sans m0',
  },
})
