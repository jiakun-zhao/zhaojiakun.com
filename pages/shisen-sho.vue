<script lang="ts" setup>
import { createArray, isNull, isUndefined, range, shuffle } from '@jiakun-zhao/utils'

useHead({ bodyAttrs: { class: 'of-hidden' } })

interface Point {
  type: 'position' | 'block'
}

interface Position extends Point {
  x: number
  y: number
}

interface Block extends Position {
  index: number
  source: Source
  isEliminated: boolean
  isSelected: boolean
}

type Source = number
type Path = [Block, Block] | [Block, Block, Block] | [Block, Block, Block, Block] | [Block, Position, Position, Block] | null
type Tasks = ((start: Block, end: Block) => Path)[]

const WIDTH = 10
const HEIGHT = 12
const NUMBER_OF_BLOCKS = WIDTH * HEIGHT
const NUMBER_OF_PATTERNS = 12 // 6, 12, 36
const blocks = ref<Block[]>([])
const container = ref<HTMLElement>()
const tasks: Tasks = [
  findZeroTurnPath,
  findOneTurnPath,
  findTwoTurnsPath,
]

onMounted(async () => {
  start()
  await nextTick()
  const el = container.value!
  const blockWidth = el.firstElementChild!.getBoundingClientRect().height
  el.style.setProperty('line-height', `${blockWidth}px`)
})

function start() {
  blocks.value = shuffle(createArray(NUMBER_OF_BLOCKS, createSource)).map(createBlock)
}

function createSource(index: number): Source {
  return Math.floor(index / NUMBER_OF_PATTERNS)
}

function createBlock(source: Source, index: number): Block {
  const x = index % WIDTH
  const y = Math.floor(index / WIDTH)
  return { index, source, x, y, isEliminated: false, isSelected: false, type: 'block' }
}

function findPreviousBlock() {
  return blocks.value.find(it => it.isSelected)
}

function getBlock(xOrIndex: number, y?: number) {
  return blocks.value[isUndefined(y) ? xOrIndex : y * WIDTH + xOrIndex]
}

function eliminate(path: Path) {
  if (isNull(path) || path.length < 2 || path.length > 4)
    return false

  const b1 = path.at(0) as Block
  const b2 = path.at(-1) as Block

  b1.isEliminated = true
  b2.isEliminated = true
  b1.isSelected = false
  b2.isSelected = false

  return true
}

function onBlockClick(currentBlock: Block) {
  const previousBlock = findPreviousBlock()

  if (!previousBlock) {
    currentBlock.isSelected = true
    return
  }

  if (previousBlock.index === currentBlock.index)
    return

  if (currentBlock.source === previousBlock.source) {
    const args = [currentBlock, previousBlock] as const
    for (const task of tasks) {
      if (eliminate(task(...args)))
        return
    }
  }

  if (blocks.value.every(it => it.isEliminated)) {
    // TODO
    // eslint-disable-next-line no-alert
    alert('You win.')
    start()
    return
  }

  currentBlock.isSelected = true
  previousBlock.isSelected = false
}

function isDirectConnectionValid(b1: Block, b2: Block) {
  let step: number

  if (b1.x === b2.x) {
    step = WIDTH
  } else if (b1.y === b2.y) {
    step = 1
  } else {
    return false
  }

  const min = Math.min(b1.index, b2.index)
  const max = Math.max(b1.index, b2.index)
  const start = min + step

  for (let i = start; i < max; i += step) {
    if (!blocks.value[i].isEliminated)
      return false
  }

  return true
}

function findZeroTurnPath(start: Block, end: Block): Path {
  return isDirectConnectionValid(start, end) ? [start, end] : null
}

function findOneTurnPath(start: Block, end: Block): Path {
  const corners = [getBlock(start.x, end.y), getBlock(end.x, start.y)]
  for (const corner of corners) {
    if (corner.isEliminated && isDirectConnectionValid(start, corner) && isDirectConnectionValid(corner, end))
      return [start, corner, end]
  }
  return null
}

function findTwoTurnsPath(b1: Block, b2: Block): Path {
  const len = Math.max(WIDTH, HEIGHT)
  const xRange = createRange(Math.floor((b1.x + b2.x) / 2), WIDTH)
  const yRange = createRange(Math.floor((b1.y + b2.y) / 2), HEIGHT)

  for (let i = 0; i < len; i++) {
    if (i < WIDTH) {
      const x = xRange[i]
      const c1 = getBlock(x, b1.y)
      const c2 = getBlock(x, b2.y)
      if (isTwoTurnsConnectionValid(b1, c1, c2, b2))
        return [b1, c1, c2, b2]
      const ox = x === 0 ? -1 : x === WIDTH - 1 ? WIDTH : undefined
      if (!isUndefined(ox) && isTwoTurnsEdgeValid(b1, c1) && isTwoTurnsEdgeValid(b2, c2))
        return [b1, { x: ox, y: b1.y, type: 'position' }, { x: ox, y: b2.y, type: 'position' }, b2]
    }
    if (i < HEIGHT) {
      const y = yRange[i]
      const c1 = getBlock(b1.x, y)
      const c2 = getBlock(b2.x, y)
      if (isTwoTurnsConnectionValid(b1, c1, c2, b2))
        return [b1, c1, c2, b2]
      const oy = y === 0 ? -1 : y === HEIGHT - 1 ? HEIGHT : undefined
      if (!isUndefined(oy) && isTwoTurnsEdgeValid(b1, c1) && isTwoTurnsEdgeValid(b2, c2))
        return [b1, { y: oy, x: b1.x, type: 'position' }, { y: oy, x: b2.x, type: 'position' }, b2]
    }
  }

  return null
}

function isTwoTurnsEdgeValid(block: Block, edgeBlock: Block) {
  return block.index === edgeBlock.index || (edgeBlock.isEliminated && isDirectConnectionValid(block, edgeBlock))
}

function isTwoTurnsConnectionValid(b1: Block, c1: Block, c2: Block, b2: Block) {
  return b1.index !== c1.index
    && b1.index !== c1.index
    && b2.index !== c1.index
    && b2.index !== c2.index
    && c1.isEliminated
    && c2.isEliminated
    && isDirectConnectionValid(b1, c1)
    && isDirectConnectionValid(c1, c2)
    && isDirectConnectionValid(c2, b2)
}

function createRange(current: number, size: number) {
  return range(size).toSorted((a, b) => Math.abs(a - current) - Math.abs(b - current))
}
</script>

<template>
  <div w-screen px2 pt16>
    <div
      ref="container"
      grid="~ cols-9"
      mx-auto h-full gap-1
      :style="{
        aspectRatio: ` ${WIDTH} / ${HEIGHT}`,
        gridTemplateColumns: `repeat(${WIDTH},minmax(0,1fr))`,
      }"
    >
      <div
        v-for="block in blocks" :key="block.index"
        b="1 solid shadcn hover:accent" text="sm center shadcn-muted hover:accent" aspect="1/1"
        cursor-pointer select-none font-bold lh-inherit transition-all-300
        :class="{
          'scale-90 bg-accent:20 b-transparent': block.isSelected,
          'op-0 scale-0': block.isEliminated,
        }"
        @click="onBlockClick(block)"
      >
        {{ block.source }}
      </div>
    </div>
  </div>
</template>
