<script lang="ts" setup>
const className = [
  '[&_a]:transition-500 [&_a]:decoration-none',
  '[&_a]:t1 [&_a:hover]:text-accent [&_a]:font-normal',
  '[&_a]:b1 [&_a]:b-b [&_a:hover]:b-[currentColor]',
  '[&_p]:t2 [&_p]:text-sm [&_p]:leading-8',
]
</script>

<template>
  <div
    slide-enter :class="className"
    tracking-wider text-justify font-300
    w-full max-w-3xl p8 mx-auto
  >
    <RouterView />
  </div>
</template>

<!--

class="[&_a]:b1 [&_a]:border-b [&_a]:duration-500 [&_a]:transition"
    tracking-wider text-justify w-full p8 font-300 max-w-3xl mx-auto

 -->
