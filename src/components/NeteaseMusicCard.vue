<script lang="ts" setup>
import { useFetch, useMediaControls } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{ id: string }>()
const url = () => `https://fun.zhaojiakun.com/api/netease-cloud-music/${props.id}`
const { data } = useFetch(url).json()

const audio = ref<HTMLMediaElement>()
const { playing } = useMediaControls(audio, { src: () => data.value?.url?.replace('http://', 'https://') })
</script>

<template>
  <div v-if="data && data.url" flex gap-4 bg-secondary p-1.8 rd-6px mb-8>
    <div
      flex items-center justify-center w-16 h-16 relative
      cursor-pointer select-none rd-4px
      @click="playing = !playing"
    >
      <img
        v-if="data.al.picUrl" :src="data.al.picUrl" :alt="data.al.id"
        w-full aspect="1/1" rd-inherit
      >
      <div absolute bg-black:20 w-full h-full rd-inherit></div>
      <div
        absolute text-2xl text-white
        :class="playing ? 'i-ph:pause-circle-fill' : 'i-ph:play-circle-fill'"
      />
    </div>
    <div flex="~ col" justify-around>
      <h4 my-0 mt-5px>{{ data.name || 'Unknown' }}</h4>
      <p my-0 mb-2 class="text-xs!">{{ data.ar.map((i:any) => i.name).join(',') || 'Unknown' }}</p>
    </div>
  </div>
  <audio ref="audio" height="0" width="0" />
</template>
