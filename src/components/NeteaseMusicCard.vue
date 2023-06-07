<script lang="ts" setup>
import { useFetch, useMediaControls } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{ id: number }>()
const audioEl = ref<HTMLMediaElement>()
const { data } = useFetch(() => `https://fun.zhaojiakun.com/api/netease-cloud-music/${props.id}`, {
  afterFetch: (ctx) => {
    if (ctx.response.status === 200 && ctx.data.url)
      ctx.data.url = ctx.data.url.replace('http://', 'https://')
    return ctx
  },
}).json()
const { waiting, playing } = useMediaControls(audioEl, { src: () => data.value.url })
</script>

<template>
  <div flex gap-4 bg-secondary p-1.8 rd-10px mb-12>
    <div
      flex items-center justify-center w-16 h-16 relative
      cursor-pointer select-none rd-6px
    >
      <Transition name="fade">
        <img
          v-if="data?.al?.picUrl" :src="data.al.picUrl" :alt="data?.al?.id"
          w-full rd-inherit aspect="1/1"
        >
      </Transition>
      <div absolute bg-black:20 w-full h-full rd-inherit></div>
      <div
        v-if="!waiting"
        absolute t="2xl white"
        :class="playing ? 'i-ph:pause-circle-fill' : 'i-ph:play-circle-fill'"
        @click="playing = !playing"
      />
    </div>
    <div flex="~ col" justify-around>
      <h4 mt--1 mb-0>{{ data?.name || '' }}</h4>
      <p my-0 t-xs>{{ data?.ar?.map((i:any) => i.name).join(',') || '' }}</p>
    </div>
  </div>
  <audio ref="audioEl" w-0 h-0 />
</template>
