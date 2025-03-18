import type { RehypeShikiOptions } from '@shikijs/rehype'
import type { ThemeRegistration } from 'shiki'

// @unocss-include

const text = {
  primary: 'hsl(var(--shadcn-foreground))',
  secondary: 'hsl(var(--shadcn-foreground) / .46 )',
  tertiary: 'hsl(var(--shadcn-foreground) / .16 )',
}

export const theme: ThemeRegistration & { name: string } = {
  name: 'hi-theme',
  bg: 'inherit',
  fg: text.primary,
  tokenColors: [
    { scope: 'keyword', settings: { foreground: text.secondary } },
    { scope: 'punctuation', settings: { foreground: text.secondary } },
    { scope: 'storage.type', settings: { foreground: text.secondary } },
    { scope: 'meta.brace', settings: { foreground: text.secondary } },

    { scope: 'entity.name.type.alias', settings: { foreground: text.primary } },
    { scope: 'entity.name.type.interface', settings: { foreground: text.primary } },
    { scope: 'meta.return.type', settings: { foreground: text.secondary } },
    { scope: 'meta.type.annotation', settings: { foreground: text.secondary } },
    { scope: 'meta.type.parameters', settings: { foreground: text.secondary } },
    { scope: 'entity.name.type', settings: { foreground: text.secondary } },

    { scope: 'comment', settings: { foreground: text.tertiary } },
    { scope: 'punctuation.definition.comment', settings: { foreground: text.tertiary } },
    { scope: 'entity.name.function', settings: { fontStyle: 'bold' } },
  ],
}

const rehypeShikiOptions: RehypeShikiOptions = {
  langs: [
    'javascript',
    'typescript',
  ],
  transformers: [{
    pre(hast) {
      this.addClassToHast(hast, 'of-x-auto rd-lg bg-shadcn-muted px4 py2 lh-relaxed relative')
    },
  }],
  themes: {
    light: theme,
  },
}

export default rehypeShikiOptions
