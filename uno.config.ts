import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ dark: 'media', preflight: false }),
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
    'text-primary': 'text-black dark:text-white',
    'text-secondary': 'text-#767676 dark:text-#898989',
    'text-thirdly': 'text-#bababa dark:text-#444',

    'bg-primary': 'bg-white dark:bg-black',
    'bg-secondary': 'bg-#f2f2f2 dark:bg-#191919',

    'border-primary': 'border-#ddd dark:border-#333',
    'border-secondary': 'border-#eee dark:border-#222',

    'body-primary': 'text-primary bg-primary font-sans m0',
  },
})
