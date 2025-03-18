import type { Theme } from 'unocss/preset-wind3'
import { defineConfig, definePreset, presetAttributify, presetIcons, presetWind3, transformerCompileClass } from 'unocss'

const presetRoundedMask = definePreset(() => {
  const cssKey = '--rounded-mask-url'
  const cssValue = `var(${cssKey}) center / 100% 100% no-repeat`
  /* cSpell:disable-next-line */
  const url = 'url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.41%22%20clip-rule%3D%22evenodd%22%20version%3D%221.1%22%20viewBox%3D%220%200%20460%20460%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M460%20316.1c0%205.5%200%2010.99-.04%2016.48-.03%204.63-.08%209.26-.2%2013.88a201.73%20201.73%200%200%201-2.66%2030.21c-1.71%2010-4.9%2019.68-9.47%2028.73a96.6%2096.6%200%200%201-42.23%2042.23%20101.86%20101.86%200%200%201-28.71%209.46c-10%201.65-20.1%202.54-30.22%202.66a649%20649%200%200%201-13.88.21c-5.5.03-10.99.03-16.48.03H143.89c-5.49%200-10.98%200-16.48-.03a648.8%20648.8%200%200%201-13.88-.2%20201.46%20201.46%200%200%201-30.22-2.67c-9.99-1.7-19.67-4.9-28.71-9.46a96.61%2096.61%200%200%201-42.23-42.22%20101.96%20101.96%200%200%201-9.47-28.74%20201.6%20201.6%200%200%201-2.66-30.2c-.12-4.63-.18-9.26-.2-13.89C0%20327.08%200%20321.6%200%20316.1V143.9c0-5.5%200-11%20.04-16.5.02-4.62.08-9.25.2-13.87a201.64%20201.64%200%200%201%202.66-30.2c1.71-10%204.9-19.68%209.47-28.74A96.6%2096.6%200%200%201%2054.6%2012.36%20101.96%20101.96%200%200%201%2083.3%202.9c10-1.64%2020.1-2.53%2030.22-2.66%204.63-.12%209.26-.18%2013.88-.2%205.5-.03%2011-.03%2016.48-.03H316.1c5.5%200%2011%200%2016.49.03a649%20649%200%200%201%2013.88.2c10.12.13%2020.22%201.02%2030.21%202.66%2010%201.71%2019.67%204.9%2028.72%209.46a96.58%2096.58%200%200%201%2042.24%2042.23%20101.92%20101.92%200%200%201%209.46%2028.73%20201.7%20201.7%200%200%201%202.66%2030.21c.12%204.63.18%209.26.2%2013.88.04%205.5.04%2010.99.04%2016.48V316.1z%22%2F%3E%3C%2Fsvg%3E%0A)'
  return {
    name: 'preset-rounded-mask',
    preflights: [{ getCSS: () => `:root{${cssKey}:${url}}` }],
    rules: [['rounded-mask', { '-webkit-mask': cssValue, 'mask': cssValue }]],
  }
})

export default defineConfig<Theme>({
  blocklist: [
    'resize',
    'container',
    'contents',
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetRoundedMask(),
    presetIcons({
      scale: 1.2,
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' },
    }),
  ],
  transformers: [
    transformerCompileClass(),
  ],
  shortcuts: [{
    'absolute-full': 'absolute top-0 left-0 right-0 bottom-0 size-full',
    'flex-center': 'items-center justify-center',
    'btn-reset': 'outline-none bg-transparent p0 b-none font-size-inherit font-inherit text-inherit',
  }],
  theme: {
    colors: {
      accent: '#954',
      shadcn: {
        input: 'hsl(var(--shadcn-input))',
        ring: 'hsl(var(--shadcn-ring))',
        chart: {
          1: 'hsl(var(--shadcn-chart-1))',
          2: 'hsl(var(--shadcn-chart-2))',
          3: 'hsl(var(--shadcn-chart-3))',
          4: 'hsl(var(--shadcn-chart-4))',
          5: 'hsl(var(--shadcn-chart-5))',
        },
      },
    },
    textColor: {
      shadcn: {
        DEFAULT: 'hsl(var(--shadcn-foreground))',
        card: 'hsl(var(--shadcn-card-foreground))',
        popover: 'hsl(var(--shadcn-popover-foreground))',
        primary: 'hsl(var(--shadcn-primary-foreground))',
        secondary: 'hsl(var(--shadcn-secondary-foreground))',
        muted: 'hsl(var(--shadcn-muted-foreground))',
        accent: 'hsl(var(--shadcn-accent-foreground))',
        destructive: 'hsl(var(--shadcn-destructive-foreground))',
      },
    },
    backgroundColor: {
      shadcn: {
        DEFAULT: 'hsl(var(--shadcn-background))',
        card: 'hsl(var(--shadcn-card))',
        popover: 'hsl(var(--shadcn-popover))',
        primary: 'hsl(var(--shadcn-primary))',
        secondary: 'hsl(var(--shadcn-secondary))',
        muted: 'hsl(var(--shadcn-muted))',
        accent: 'hsl(var(--shadcn-accent))',
        destructive: 'hsl(var(--shadcn-destructive))',
      },
    },
    borderColor: {
      shadcn: {
        DEFAULT: 'hsl(var(--shadcn-border))',
      },
    },
    fontFamily: {
      sans: '"Geist Variable",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
      mono: '"Geist Mono Variable","DM Mono","IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    zIndex: {
      max: '2147483647',
      min: '-2147483647',
    },
    transitionProperty: {
      'grid-rows': 'grid-template-rows',
    },
  },
})
