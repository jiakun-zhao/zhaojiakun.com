<script lang="ts" setup>
function onWheel(e: WheelEvent) {
  // e.preventDefault()

  const el = e.currentTarget as HTMLDivElement
  const delta = e.deltaX + e.deltaY
  const scrollWidth = el.scrollWidth
  const clientWidth = el.clientWidth

  let scrollLeft = el.scrollLeft + delta

  if (scrollLeft <= 0) {
    scrollLeft = scrollWidth / 2 + scrollLeft
  } else if (scrollLeft >= scrollWidth - clientWidth) {
    scrollLeft = scrollWidth / 2 - (scrollWidth - scrollLeft)
  }

  el.scroll({ left: scrollLeft })
}
</script>

<template>
  <div
    flex gap-4 of-x-auto aspect="2/1"
    class=":uno: [raw:scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    @wheel.prevent="onWheel"
  >
    <template v-for="part in 2" :key="part">
      <div v-for="item in 5" :key="part * 10 + item" h-full w="1/2.75" flex="[0_0_auto]">
        <div size-full rd-md bg-shadcn-muted:64 text-xl font-bold font-mono flex="~ center">{{ item }}</div>
      </div>
    </template>
  </div>
</template>
