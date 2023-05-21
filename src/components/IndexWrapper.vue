<script lang="ts" setup>
const className = [
  '[&_a]:transition-500 [&_a]:decoration-none',
  '[&_a]:t1 [&_a:hover]:text-accent',
  '[&_a]:b1 [&_a]:b-b [&_a:hover]:b-[currentColor]',
  '[&_p]:t2 [&_p]:text-sm [&_p]:leading-8',
  '[&_ul]:t2 [&_ul]:text-sm [&_ul]:leading-8',
]
</script>

<template>
  <div
    slide-enter :class="className"
    tracking-wider text-justify
    w-full max-w-3xl p8 mx-auto
  >
    <slot />
  </div>
</template>
