<script lang="ts" setup>
import type { ILanguageRegistration, Lang } from 'shiki'
import { version as shikiVersion } from 'shiki/package.json'

const props = defineProps<{ lang: Lang }>()
const code = ref<Element>()
const themes = ['vitesse-dark', 'vitesse-light']

function isSupportedLang(langs: ILanguageRegistration[]) {
  return langs.map(({ id, aliases }) => [id, ...(aliases ?? [])]).flat().includes(props.lang)
}

useScriptTag(`https://cdn.jsdelivr.net/npm/shiki@${shikiVersion}`, () => {
  if (!isSupportedLang(shiki?.BUNDLED_LANGUAGES ?? []))
    return
  shiki?.getHighlighter({ langs: [props.lang], themes })
    .then((h) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = themes.map(theme => h.codeToHtml(code.value?.textContent ?? '', { lang: props.lang, theme })).join('')
      code.value?.parentElement?.replaceWith(wrapper)
    })
    .catch(console.error)
})
</script>

<template>
  <code ref="code"><slot /></code>
</template>
