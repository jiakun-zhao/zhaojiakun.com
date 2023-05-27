import type { RouteMeta } from 'vue-router'

export function useMeta(meta: Partial<RouteMeta> & Pick<RouteMeta, 'title'>) {
  const { title, description, og_image = 'og/icon.jpg' } = meta
  useHead({
    title,
    meta: [
      { name: 'og:title', content: title },
      { name: 'twitter:title', content: title },

      { name: 'description', content: description ?? title },
      { name: 'og:description', content: description ?? title },

      { name: 'og:image', content: `${location.origin}/${og_image}` },
      { name: 'twitter:image', content: `${location.origin}/${og_image}` },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: '@JiakunZhao' },
    ],
  })
}
