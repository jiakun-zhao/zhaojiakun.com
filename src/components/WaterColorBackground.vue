<script lang="ts" setup>
import { useImage } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  src: string
  speed?: number
  width: number
  height: number
}>()

const { state: image } = useImage(() => ({ src: props.src }))
const location = [[0, 0], [0, 1], [1, 0], [1, 1]]
const box = ref<HTMLDivElement>()

watchEffect(() => {
  const speed = props.speed ?? 0.001
  if (!image.value || !box.value)
    return

  box.value.innerHTML = ''
  const large = Math.max(props.width, props.height)
  const imageMaxSize = Math.sqrt(large ** 2 * 2) / 2
  const imageClearSize = Math.sqrt(imageMaxSize ** 2 * 2)

  location.forEach(([x, y]) => {
    const canvas = document.createElement('canvas')
    canvas.width = props.width
    canvas.height = props.height
    canvas.className = 'absolute top-0 left-0'
    box.value?.appendChild(canvas)

    const ctx = canvas.getContext('2d')!
    ctx.translate(props.width * x, props.height * y)

    let angle = 0
    let direction = Math.random() < 0.6 ? 1 : -1
    // 基于 location 的缩放
    const imageDisplaySize = imageMaxSize - (x + y) * large / 7
    // 前面是个裁切图片，待定...
    const sx = imageDisplaySize / 2 * x
    const sy = imageDisplaySize / 2 * y
    const swh = imageDisplaySize / 2
    const dxy = -imageDisplaySize
    const dwh = imageDisplaySize * 2

    function draw() {
      requestAnimationFrame(() => {
        ctx.save()
        ctx.clearRect(-imageClearSize, -imageClearSize, imageClearSize * 2, imageClearSize * 2)
        ctx.rotate(Math.PI / 180 + ((angle += speed) * direction))
        if (angle >= 360) {
          angle = 0
          if (Math.random() < 0.4)
            direction *= -1
        }
        ctx.drawImage(image.value!, sx, sy, swh, swh, dxy, dxy, dwh, dwh)
        ctx.restore()
        draw()
      })
    }
    draw()
  })
})
</script>

<template>
  <div
    of-hidden
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
  >
    <div
      ref="box"
      relative wh-full transform-scale-120 bg-black
      filter="blur-90 brightness-80 contrast-140"
    >
      <!-- blur-46 -->
    </div>
  </div>
</template>
