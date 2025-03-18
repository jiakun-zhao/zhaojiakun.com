<script lang="ts" setup>
// cSpell:disable-next-line
const gradient = ':uno: bg-[conic-gradient(#0b103a17_100deg,pink_135deg,#ff0_138deg,orange_140deg,#ff0_149deg,green_154deg,#87ceeb_158deg,#00f_168deg,violet_170deg,#ff0_175deg,#0b103a17_100deg)]'
const highlight = ':uno: bg-[conic-gradient(#0000,#0000_30deg,#ffffffe6,#0000,#0000_120deg)]'
</script>

<template>
  <div w-full rd-lg bg-shadcn-muted:36 flex="~ center" aspect="1/1" b="1 solid shadcn">
    <div
      flex="~ center" relative of-hidden rd-full bg-gray-2
      class=":uno: size-6/8 shadow-[0_40px_120px_rgba(0,0,0,.35)] [&>*]:absolute"
    >
      <div size-full op-60 blur-14 :class="gradient" />
      <div size-full rotate-180 op-60 blur-14 :class="gradient" />

      <div size-full :class="highlight" />
      <div size-full rotate-180 :class="highlight" />

      <div z-max rd-full class="size-9.4/10" b="0.1 solid white:60" />
      <div z-max rd-full class="size-9.0/10" b="0.1 solid white:60" />

      <div
        flex="~ center" relative
        class=":uno: size-3.4/10 bg-black/18 [&>*]:absolute [&,&>*]:rd-full"
      >
        <div class="size-17/20" bg-gray-200 />
        <div
          b="0.1 solid black:20" rotate--45
          class=":uno: size-8/20 shadow-[0_10px_30px_rgba(0,0,0,.2)_inset,0_8px_10px_rgba(0,0,0,.2),0_-8px_10px_rgba(255,255,255,.3)]"
        />
        <div class=":uno: size-13.5/20 shadow-[0_10px_30px_rgba(0,0,0,.2)_inset]" b="0.1 solid black:14" />
        <div class="size-11/20" b="0.1 solid black:5" />
      </div>
    </div>
  </div>
</template>
