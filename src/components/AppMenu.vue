<script lang="ts" setup>
import { useApp } from '~/logic'

const { isMenuShow, musicElement, musicControls, musicFromPlay } = useApp()
const router = useRouter()
const beforePath = ref<string>()

router.beforeEach((_, from, next) => {
  isMenuShow.value = false
  beforePath.value = from.meta?.title && from.fullPath
  next()
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isMenuShow"
      class="-"
      fixed top-0 right-0 bottom-0 left-0 z-2147483646
      backdrop="filter blur-24px" bg-primary:50
      @click="isMenuShow = false"
    >
      <div container py-16 max-h-full of-y-auto>
        <div>
          <RouterLink v-if="beforePath" mr-8 :to="beforePath">返回上一页</RouterLink>
          <AppRouteLinks />
        </div>
        <div v-if="musicFromPlay && musicControls.playing.value" mt-16>
          <h4 op-30 t-xs>
            <span mr-2>正在播放</span>
            <span font-400>{{ musicFromPlay.ar?.map((i:any) => i.name)?.join(' / ') ?? '未知歌手' }} - {{ musicFromPlay.al?.name ?? '未知专辑' }}</span>
          </h4>
          <h1
            mr-1 cursor-pointer
            @click.stop=" musicControls.playing.value = !musicControls.playing.value"
          >
            {{ musicFromPlay.name }}
          </h1>
          <span tip-text t-xs>点击歌曲名称关闭播放</span>
        </div>
      </div>
    </div>
  </Transition>
  <audio ref="musicElement" wh-0 />
</template>
