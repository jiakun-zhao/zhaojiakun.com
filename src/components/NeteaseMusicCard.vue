<script lang="ts" setup>
import { useFetch, useMediaControls } from '@vueuse/core'
import { computed, ref } from 'vue'

const props = defineProps<{ id: string }>()

const { data, isFinished, error } = useFetch(() => `https://fun.zhaojiakun.com/api/netease-cloud-music/${props.id}`).json()
const detail: any | null = computed(() => (!error.value && isFinished.value) ? data.value : null)
const audio = ref<HTMLMediaElement>()
const { playing } = useMediaControls(audio, { src: () => detail.value?.file?.url })
</script>

<template>
  <div v-if="detail && detail.file.url" flex gap-4 bg2 p-1.8 rounded-6px mb-8>
    <div
      flex items-center justify-center w-16 h-16 relative
      cursor-pointer select-none rounded-5px
      @click="playing = !playing"
    >
      <img
        v-if="detail.album.cover" :src="detail.album.cover" :alt="detail.album.id"
        w-full aspect="1/1" rounded-inherit
      >
      <div absolute bg-black:20 w-full h-full></div>
      <div
        absolute text-2xl text-white
        :class="playing ? 'i-ph:pause-circle-fill' : 'i-ph:play-circle-fill'"
      />
    </div>
    <div flex="~ col" justify-around>
      <h4 my-0 mt-5px>{{ detail.name || 'Unknown' }}</h4>
      <p my-0 mb-2 class="text-xs!">{{ detail.singers.map((i:any) => i.name).join(',') || 'Unknown' }}</p>
    </div>
  </div>
  <audio ref="audio" height="0" width="0" />
</template>
