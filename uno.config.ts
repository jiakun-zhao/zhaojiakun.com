import type { Theme } from 'unocss/preset-mini'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

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
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      accent: '#6054ba',
    },
    fontFamily: {
      sans: 'Inter, PingFang TC, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
      mono: 'Input, Input Mono, DM Mono, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;',
    },
    animation: {
      keyframes: {
        rotate: '{ 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }',
      },
    },
  },
  rules: [
    [/^slide-enter-(\d+)$/, ([_, d]) => ({ '--enter-initial': d })],
  ],
  shortcuts: [
    {
      'text-primary': 'text-#000 dark:text-#f2f2f2',
      'text-secondary': 'text-#767676 dark:text-#898989',
      'text-thirdly': 'text-#bababa dark:text-#444',
    }, {
      'bg-primary': 'bg-#fff dark:bg-#111',
      'bg-secondary': 'bg-#f8f8f8 dark:bg-#191919',
      'bg-inline-code': 'bg-#f0f0f0 dark:bg-#222',
    }, {
      'border-primary': 'border-#ddd dark:border-#333',
      'border-secondary': 'border-#eee dark:border-#222',
    }, {
      'container': 'w-full max-w-3xl px-6 mx-auto',
      'container-header': 'pt-16 m-0 lh-8 select-none transition-color duration-600',
      'container-subtitle': 'text-xs text-secondary pb-10 tracking-wider',
      'container-subtitle-tip': 'text-thirdly animate-fade-out animate-delay-1000 animate-duration-2000 animate-forwards',
      'b-safe': 'pb-[constant(safe-area-inset-bottom)] pb-[env(safe-area-inset-bottom)]',
    },
  ],
})
