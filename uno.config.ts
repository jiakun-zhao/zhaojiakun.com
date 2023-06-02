import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import type { Theme } from 'unocss/preset-mini'
import transformerDirectives from '@unocss/transformer-directives'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig<Theme>({
  presets: [
    presetUno({ dark: 'media' }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' },
      autoInstall: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerAttributifyJsx(),
  ],
  theme: {
    colors: {
      accent: '#6054ba',
    },
    fontFamily: {
      sans: 'Inter, PingFang TC, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
      mono: 'Input, Input Mono, DM Mono, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;',
    },
  },
  shortcuts: [
    [/^wh-(.*)$/, ([, n]) => `w-${n} h-${n}`],
    {
      'text-primary': 'text-#000 dark:text-#f2f2f2',
      'text-secondary': 'text-#767676 dark:text-#898989',
      'text-thirdly': 'text-#bababa dark:text-#444',
    }, {
      'bg-primary': 'bg-#fff dark:bg-#111',
      'bg-secondary': 'bg-#f2f2f2 dark:bg-#191919',
    }, {
      'border-primary': 'border-#ddd dark:border-#333',
      'border-secondary': 'border-#eee dark:border-#222',
    }, {
      'shortcut-container': 'w-full max-w-3xl px-6 mx-auto',
      'shortcut-header': 'pt-16 m-0 lh-8 select-none transition-color duration-600',
      'shortcut-safe-bottom': 'pb-[constant(safe-area-inset-bottom)] pb-[env(safe-area-inset-bottom)]',
    },
  ],
})
