<script lang="ts" setup>
import { useFetch } from '@vueuse/core'
import { useApp } from '~/logic'

const props = defineProps<{ id: number }>()

const { musicFromPage, musicControls, musicFromPlay } = useApp()
const { data } = useFetch(() => `https://fun.zhaojiakun.com/api/netease-cloud-music/${props.id}`, {
  afterFetch: (ctx) => {
    if (ctx.response.status === 200 && ctx.data) {
      ctx.data.url = ctx.data.url?.replace('http://', 'https://')
      musicFromPage.value = ctx.data
    }
    return ctx
  },
}).json()

function onPlay() {
  if (musicControls.playing.value) {
    musicControls.playing.value = false
    return
  }
  musicFromPlay.value = musicFromPage.value
  musicControls.playing.value = true
}
</script>

<template>
  <div flex gap-4 bg-secondary p-1.8 rd-10px mb-12>
    <div
      flex items-center justify-center wh-16 relative
      cursor-pointer select-none rd-6px
    >
      <Transition name="fade">
        <img
          v-if="data?.al?.picUrl" :src="data.al.picUrl" :alt="data?.al?.id"
          w-full rd-inherit aspect="1/1"
        >
      </Transition>
      <div absolute bg-black:20 wh-full rd-inherit></div>
      <div
        v-if="musicFromPage && !musicControls.waiting.value"
        absolute t="2xl white"
        :class="musicControls.playing.value ? 'i-ph:pause-circle-fill' : 'i-ph:play-circle-fill'"
        @click="onPlay"
      />
    </div>
    <div flex="~ col" justify-around>
      <h4 m="t--1 b0">{{ data?.name || '' }}</h4>
      <p m="t0 b2" t-xs>{{ data?.ar?.map((i:any) => i.name).join(',') || '' }}</p>
    </div>
  </div>
</template>
