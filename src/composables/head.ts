import { useHead } from '@vueuse/head'
import { usePreferredDark } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import type { Head } from '~/types'

export const isDark = usePreferredDark()

export function useCustomHead(head: MaybeRefOrGetter<Head>) {
  useHead(() => {
    const input = toValue(head)
    const title = input.title
    const description = input.description ?? title
    const ogImage = `${location.origin}/og/${input.ogImage ?? 'icon.jpg'}`
    const author = input.author ?? 'Jiakun Zhao'
    return {
      title,
      meta: [
        { property: 'og:title', content: title },
        // { name: 'twitter:title', content: title },

        { name: 'description', content: description },
        { property: 'og:description', content: description },
        // { name: 'twitter:description', content: description },

        { property: 'og:image', content: ogImage },
        // { name: 'twitter:image', content: ogImage },

        { name: 'theme-color', content: isDark.value ? '#121212' : '#ffffff' },
        { name: 'author', content: author },
      ],
    }
  })
}
