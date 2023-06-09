<script lang="ts" setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import prompts from '~/pages/tools/MidjourneyQuickPrompt.json'

// http://www.sucaijishi.com/articles-51-439-1.html
// const params = {
//   q: ['.25', '.5', '1', '2'],
//   ar: ['1:1', '4:5', '5:4', '2:3', '3:2', '9:16', '16:9', '3:4', '4:3', '1:2', '2:1'],
// }

const selected = ref<string>(Object.keys(prompts)[0])
const list = ref<string[]>([])
const { copy, copied } = useClipboard({
  source: () => list.value.join(),
})

function setPromptMap(item: string) {
  const value = (prompts as any)[selected.value][item]
  list.value.includes(value)
    ? list.value = list.value.filter(i => i !== value)
    : list.value.push(value)
}
</script>

<template>
  <div container>
    <div
      bg-secondary text-secondary mt-8 p-3 rd-6px text-sm select-none cursor-pointer
    >
      {{ list.length ? list.join() : '结果显示...' }}
    </div>
    <div pt-4 pb-8 flex text-sm text-secondary>
      <Transition name="fade">
        <div v-if="copied" px-3>拷贝成功</div>
      </Transition>
      <div ml-auto px-2 py-1 rd-6px bg-secondary cursor-pointer select-none @click="copy()">拷贝</div>
      <div ml-2 px-2 py-1 rd-6px bg-secondary cursor-pointer select-none @click="list = []">清除</div>
    </div>
    <div flex justify-between>
      <span
        v-for="item, idx of Object.keys(prompts)" :key="idx"
        hover:text-accent cursor-pointer px-2 py-1 rd-6px
        :class="{ 'text-accent bg-secondary': item === selected }"
        @click="selected = item"
      >
        {{ item }}
      </span>
    </div>
    <div pb-10vh pt-8 grid="~ cols-2 sm:cols-2 md:cols-3 lg:cols-3 xl:cols-4">
      <span
        v-for="item, jdx of Object.keys((prompts as any)[selected])" :key="jdx"
        hover:text-accent leading-loose cursor-pointer select-none text-secondary text-sm
        :class="{ 'font-bold text-accent': list.includes((prompts as any)[selected][item]) }"
        @click="setPromptMap(item)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>
