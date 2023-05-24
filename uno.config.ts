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
  rules: [
    [/^slide-enter-(\d+)$/, m => ({ '--enter-stage': `${m[1]}`, 'animation': 'inherit', 'animation-delay': 'inherit' })],
  ],
  theme: {
    colors: {
      accent: '#6054ba',
    },
  },
  shortcuts: {
    'bg1': 'bg-#ffffff dark:bg-#111111',
    'bg2': 'bg-#f2f2f2 dark:bg-#191919',

    't1': 'text-#000000 dark:text-#ffffff',
    't2': 'text-#767676 dark:text-#898989',
    't3': 'text-#bababa dark:text-#444444',

    'b1': 'b-#ddd dark:b-#333 border-solid border-0',
    'b2': 'b-#eee dark:b-#222 border-solid border-0',

    'safe-bottom': 'pb-[constant(safe-area-inset-bottom)] pb-[env(safe-area-inset-bottom)]',

    'index-wrapper': [
      // a
      '[&_a]:transition-500',
      '[&_a]:decoration-none',
      '[&_a]:t1',
      '[&_a]:b1',
      '[&_a]:b-b',
      '[&_a:hover]:text-accent',
      '[&_a:hover]:b-[currentColor]',

      // p
      '[&_p]:t2',
      '[&_p]:text-sm',
      '[&_p]:leading-8',

      // ul
      '[&_ul]:t2',
      '[&_ul]:text-sm',
      '[&_ul]:leading-8',
      '[&_ul]:ps-7.2',

      // img
      '[&_img]:max-w-full',
      '[&_img]:block',

      // inline_code
      // '[&_code:not(pre>code)]:t1',
      '[&_code:not(pre>code)]:tracking-normal',
      '[&_code:not(pre>code)]:bg2',
      '[&_code:not(pre>code)]:rounded-5px',
      '[&_code:not(pre>code)]:px-5px',
      '[&_code:not(pre>code)]:py-2px',

      // block_code
      '[&_pre]:bg2!',
      '[&_pre]:rounded-6px',
      '[&_pre]:px-4',
      '[&_pre]:py-3.5',
      '[&_pre]:of-x-auto',
      '[&_pre]:t2',
      '[&_pre]:leading-6',
      '[&_pre]:text-sm',

      // blockquote

      '[&_blockquote]:bg2',
      '[&_blockquote]:rounded-6px',
      '[&_blockquote]:mx-0',
      '[&_blockquote]:px-4',
      '[&_blockquote]:py-2',
      '[&_blockquote>p]:m-0',

      // strong
      '[&_strong]:t1',

      // wrap
      'text-justify',
      'break-words',
      'break-all',

      // base
      'tracking-wider',
      'w-full',
      'max-w-3xl',
      'p8',
      'mx-auto',
    ],

    'uno-figure': [
      'm-0',
      '[&_figcaption]:text-xs',
      '[&_figcaption]:t3',
      '[&_figcaption]:py-4',
    ],
  },
})
