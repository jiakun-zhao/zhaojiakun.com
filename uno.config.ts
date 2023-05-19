import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'
import type { Theme } from 'unocss/preset-mini'

export default defineConfig<Theme>({
  presets: [
    presetUno({ dark: 'media', preflight: false }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        mono: ['DM Mono'],
      },
    }),
  ],
  theme: {
    fontFamily: {
      sans: '"DM Mono", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
      mono: '"DM Mono", Input, "Input Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    colors: {
      accent: '#6054ba',
      mid: '#aaa',
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
