// https://unocss.dev/presets/attributify#typescript-support-jsx-tsx
import type { AttributifyAttributes } from 'unocss/preset-attributify'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
