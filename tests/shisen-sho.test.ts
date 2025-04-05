import { range } from '@jiakun-zhao/utils'
import { expect, it } from 'vitest'

function createArray(current: number, start: number = 0, end: number = 16) {
  return range(start, end).toSorted((a, b) => Math.abs(a - current) - Math.abs(b - current))
}

it('shisen-sho', () => {
  const array = range(0, 16)
  const current = 12
  const result = array.toSorted((a, b) => Math.abs(a - current) - Math.abs(b - current))

  const { row: row1, col: col1 } = { row: 10, col: 5 }
  const { row: row2, col: col2 } = { row: 12, col: 3 }

  const rowStart = Math.floor((row1 + row2) / 2)
  const colStart = Math.floor((col1 + col2) / 2)

  expect(array.join()).toMatchInlineSnapshot(`"0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"`)
  expect(result.join()).toMatchInlineSnapshot(`"12,11,13,10,14,9,15,8,7,6,5,4,3,2,1,0"`)

  expect(createArray(rowStart).join()).toMatchInlineSnapshot(`"11,10,12,9,13,8,14,7,15,6,5,4,3,2,1,0"`)
  expect(createArray(colStart).join()).toMatchInlineSnapshot(`"4,3,5,2,6,1,7,0,8,9,10,11,12,13,14,15"`)

  expect(isSameLine(1, 10)).toMatchInlineSnapshot(`true`)
  expect(toRow(10)).toMatchInlineSnapshot(`1`)
  expect(toCol(9)).toMatchInlineSnapshot(`0`)

  expect(range(1, 2).join()).toMatchInlineSnapshot(`"1"`)
})

function isSameLine(i1: number, i2: number) {
  const COLS = 9
  return ~~(i1 / COLS) === ~~(i2 / COLS) || i1 % COLS === i2 % COLS
}

function toRow(index: number) {
  const COLS = 9
  return Math.floor(index / COLS)
}

function toCol(index: number) {
  const COLS = 9
  return index % COLS
}
