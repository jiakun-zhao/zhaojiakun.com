import type { Theme } from 'unocss/preset-wind3'
import { presetShadcn } from '@jiakun-zhao/uno-shadcn'
import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig<Theme>({
  blocklist: [
    'resize',
    'container',
    'contents',
  ],
  presets: [
    presetShadcn(),
    presetAttributify(),
    presetWind3({ dark: 'media' }),
    presetIcons({ scale: 1.2, extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' } }),
  ],
  rules: [
    [/^\[raw:([^:]+):([^\]]+)\]$/, ([,key, value]) => ({ [key]: value.replaceAll('_', ' ') })],
  ],
  shortcuts: [
    {
      'absolute-full': 'absolute top-0 left-0 right-0 bottom-0 size-full',
      'flex-center': 'items-center justify-center',
      'btn-reset': 'outline-none bg-transparent p0 b-none font-size-inherit font-inherit text-inherit',
      'w-screen': 'w-[var(--w-screen-fix,100vw)]',
      'h-screen': 'h-[var(--h-screen-fix,100vh)]',
      'size-screen': 'w-screen h-screen',
      'bg-wechat': '[.wechat_&]:bg-#ededed [.wechat_&]:dark:bg-#111',
    },
  ],
  theme: {
    animation: {
      keyframes: {
        'slide-enter': '{0%{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}',
      },
    },
    colors: {
      accent: '#954',
    },
    fontFamily: {
      mono: '"Geist Mono Variable","DM Mono","IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      sans: '"Geist Variable",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
    },
    transitionProperty: {
      'grid-rows': 'grid-template-rows',
    },
    zIndex: {
      max: '2147483647',
      min: '-2147483647',
    },
  },
})
