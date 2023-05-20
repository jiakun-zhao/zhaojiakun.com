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
      accent: '#6054ba',
    },
  },
  shortcuts: {
    bg1: 'bg-#ffffff dark:bg-#111111',
    bg2: 'bg-#f2f2f2 dark:bg-#191919',

    t1: 'text-#000000 dark:text-#ffffff',
    t2: 'text-#767676 dark:text-#898989',
    t3: 'text-#bababa dark:text-#444444',

    b1: 'b-#ddd dark:b-#333 border-solid border-0',
    b2: 'b-#eee dark:b-#222 border-solid border-0',
  },
})
