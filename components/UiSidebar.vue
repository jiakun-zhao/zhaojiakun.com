<script lang="ts" setup generic="T">
import { notUndefined } from '@jiakun-zhao/utils'

interface Child {
  name: string
  data?: T
}

const props = defineProps<{
  title: string
  children?: Child[]
}>()

const emit = defineEmits<{
  selected: [data: Child]
  change: [isOpen: boolean]
}>()

const isOpen = ref(false)
const hasChildren = computed(() => notUndefined(props.children))
</script>

<template>
  <div select-none text-shadcn-muted>
    <button
      btn-reset w-full cursor-pointer py2 hover:text-shadcn
      flex="~ items-center justify-between"
      transition="color duration-250"
      class=":uno: [&>span]:pointer-events-none"
      @click="() => emit('change', isOpen = !isOpen)"
    >
      <span>{{ props.title }}</span>
      <span v-if="hasChildren" text-sm class="i-ph:caret-right-bold" transition="transform duration-350" :rotate="isOpen ? '90' : '0'" />
    </button>
    <div
      v-if="hasChildren"
      grid transition="grid-rows duration-350"
      :rows="isOpen ? '[1fr]' : '[0fr]'"
    >
      <ul ml1 list-none of-hidden pl2 m="0 [&>li:first-child]:t1 [&>li:last-child]:b-1" b="0 l-1 solid shadcn">
        <li
          v-for="item of props.children" :key="item.name"
          m0 cursor-pointer rd-1 px2 py1
          hover:text-shadcn transition="color duration-250"
          @click="() => emit('selected', item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
