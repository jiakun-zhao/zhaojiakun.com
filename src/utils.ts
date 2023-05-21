import type { UseHeadInput } from '@vueuse/head'
import { useHead } from '@vueuse/head'
import type { DefaultFrontMatter } from '~/types'

export const BASE_URL = location.origin

export function useDefaultHead(frontMatter: DefaultFrontMatter, other?: UseHeadInput) {
  const {
    title,
    description,
    og_image,
  } = frontMatter
  useHead({
    title,
    meta: [
      { name: 'og:title', content: title },
      { name: 'twitter:title', content: title },

      { name: 'description', content: description },
      { name: 'og:description', content: description },
      { name: 'twitter:description', content: description },

      { name: 'og:image', content: og_image ?? `${BASE_URL}/og.jpg` },
      { name: 'twitter:image', content: og_image ?? `${BASE_URL}/og.jpg` },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: '@JiakunZhao' },
    ],
    ...other,
  })
}
