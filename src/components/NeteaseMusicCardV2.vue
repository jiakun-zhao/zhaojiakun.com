<script lang="ts" setup>
const props = defineProps<{ id: string }>()

const url = () => `https://fun.zhaojiakun.com/api/netease-cloud-music/${props.id}`

const audio = ref<HTMLMediaElement>()
const { data } = useFetch(url).json()
const { playing } = useMediaControls(audio, { src: () => data.value?.url?.replace('http://', 'https://') })
</script>

<template>
  <div
    :h="data ? 16 : 0"
    of-hidden transition="height duration-300"
  >
    {{ data }}
    <audio ref="audio" h-0 w-0 />
  </div>
</template>
