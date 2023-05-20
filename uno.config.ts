import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import type { Theme } from 'unocss/preset-mini'

export default defineConfig<Theme>({
  presets: [
    presetUno({ dark: 'media' }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' },
    }),
  ],
  theme: {
    colors: {
      accent: 'var(--accent)',
    },
  },
  shortcuts: {
    bg1: 'bg-[var(--bg1)]',
    bg2: 'bg-[var(--bg2)]',

    t1: 'text-[var(--t1)]',
    t2: 'text-[var(--t2)]',
    t3: 'text-[var(--t3)]',

    b1: 'border-[var(--b1)] border-solid border-0',
    b2: 'border-[var(--b2)] border-solid border-0',
  },
})
