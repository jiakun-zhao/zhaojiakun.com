import type { UseHeadInput } from '@vueuse/head'
import { useHead } from '@vueuse/head'
import { version as shikiVersion } from 'shiki/package.json'
import type { Directive } from 'vue'
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

      { name: 'og:image', content: `${BASE_URL}/${og_image ?? 'og.jpg'}` },
      { name: 'twitter:image', content: `${BASE_URL}/${og_image ?? 'og.jpg'}` },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: '@JiakunZhao' },
    ],
    ...other,
  })
}

export const loadJavaScript = async function (src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.src = src
    document.head.appendChild(script)
  })
}

async function getShiki() {
  if (!window.shiki)
    await loadJavaScript(`https://cdn.jsdelivr.net/npm/shiki@${shikiVersion}`)
  return window.shiki!
}

export const vShiki: Directive = {
  mounted: (el) => {
    const themes = ['vitesse-dark', 'vitesse-light']
    const lang = el.dataset.language
    getShiki()
      .then(shiki => shiki.getHighlighter({ langs: [lang], themes }))
      .then((h) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML
         = themes.map(theme => h.codeToHtml(el.textContent, { lang, theme })).join('')
        el.replaceWith(...Array.from(wrapper.childNodes))
      })
      .catch(console.error)
  },
}
