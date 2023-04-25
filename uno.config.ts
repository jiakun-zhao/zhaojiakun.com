import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
    presets: [
        presetUno({ dark: 'media', preflight: false }),
        presetAttributify(),
        presetIcons({ scale: 1.2, extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' } }),
    ],
    theme: {
        font: {
            sans: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        },
    },
})
