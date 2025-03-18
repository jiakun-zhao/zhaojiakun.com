<script lang="ts" setup>
function onClick(e: Event) {
  ;(e.target as HTMLDivElement).classList.toggle('[&>span:last-child]:rotate-90')
  ;(e.target as HTMLDivElement).nextElementSibling?.classList.toggle('rows-[1fr]')
}
</script>

<template>
  <div relative w-full select-none of-hidden rd-lg bg-shadcn-muted:36 text-shadcn tracking-0 aspect="3/2" b="1 solid shadcn">
    <div h-full of-y-auto px4 py2 sm:max-w-64 b="0 sm:r-1 solid shadcn">
      <template v-for="parent in 12" :key="parent">
        <div my1 flex cursor-pointer items-center justify-between @click="onClick">
          <span pointer-events-none>Parent {{ parent }}</span>
          <span pointer-events-none text-sm transition-transform class="i-ph:caret-right" />
        </div>
        <div grid="~ rows-[0fr]" transition-duration-350 style="transition-property: grid-template-rows;">
          <ul list-none of-hidden px3 m="0 [&>li:first-child]:t1 [&>li:last-child]:b-1" b="0 l-1 solid shadcn">
            <li v-for="child in 8" :key="child">Child {{ parent }}.{{ child }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
