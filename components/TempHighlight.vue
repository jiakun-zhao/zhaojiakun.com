<script lang="ts" setup>
import type { Highlighter } from 'shiki'
import { bundledLanguagesInfo as languages } from 'shiki/bundle-web.mjs'
import { theme } from '~/modules/markdown/shiki'

interface UnGhResult {
  meta: {
    url: string
  }
  file: {
    contents: string
  }
}

let highlighter: Highlighter | undefined
const id = ref('typescript')
const code = ref('')
const isLoading = ref(true)

onMounted(async () => {
  highlighter = await import('shiki').then((shiki) => {
    return shiki.createHighlighter({
      langs: ['typescript'],
      themes: [theme],
    })
  })
  // @ts-expect-error
  await onLanguageChange({ target: { value: 'typescript' } })
  isLoading.value = false
})

onBeforeUnmount(() => highlighter?.dispose())

async function onLanguageChange(e: Event) {
  isLoading.value = true
  id.value = (e.target as HTMLSelectElement).value
  if (!highlighter)
    return
  const url = `https://ungh.cc/repos/shikijs/textmate-grammars-themes/files/main/samples/${id.value}.sample`
  const result = await fetch(url).then<UnGhResult>(res => res.json())
  // @ts-expect-error
  await highlighter.loadLanguage(id.value)
  code.value = highlighter.codeToHtml(result.file.contents, { theme: theme.name, lang: id.value })
  isLoading.value = false
}
</script>

<template>
  <div b="1 solid shadcn" rd-lg bg-shadcn-muted:36 tracking-0>
    <div b="0 b-1 solid shadcn" px4 py-2 :class="{ 'b-0!': !code.length }">
      <span v-show="isLoading">Loading...</span>
      <label v-show="!isLoading" for="select">Language: </label>
      <select
        v-show="!isLoading"
        id="select" ml2 cursor-pointer appearance-none b-none bg-transparent font-size-inherit text-accent
        outline-none @change="onLanguageChange"
      >
        <option v-for="language of languages" :key="language.id" :selected="language.id === id" :value="language.id">
          {{ language.name }}
        </option>
      </select>
    </div>
    <div
      text-sm lh-relaxed tracking-0
      of-y="[&>pre]:auto"
      m="[&>pre]:0"
      p="[&>pre]:4"
      rd="[&>pre]:lg"
      v-html="code"
    />
  </div>
</template>
