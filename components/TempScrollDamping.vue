<script lang="ts" setup>
let value = 0
const element = ref<HTMLDivElement>()

onMounted(() => {
  setX(0)
})

function setX(value: number) {
  element.value?.style.setProperty('transform', `translate3d(${value}px,0px,0px)`)
}

function onWheel(e: WheelEvent) {
  const delta = (-e.deltaX + -e.deltaY) / 2
  value += delta
  setX(value)
}
</script>

<template>
  <div
    relative of-hidden of-x-auto aspect="2/1"
    class=":uno: [raw:scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    @wheel.prevent="onWheel"
  >
    <div
      ref="element"
      class=":uno: [raw:transition:0.8s_cubic-bezier(0.1,0.65,0.72,0.82)]"
      absolute size-full flex gap-4
    >
      <div v-for="item in 10" :key="item" h-full w="1/2.75" flex="[0_0_auto]">
        <div size-full rd-md bg-shadcn-muted:64 text-xl font-bold font-mono flex="~ center">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
