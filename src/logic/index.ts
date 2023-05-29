export { useApp } from './app'

export function formatDate(str: string, isShort = true) {
  const date = new Date(str)
  const fn = (n: number) => n < 10 ? `0${n}` : n
  return isShort
    ? [date.getMonth() + 1, date.getDate()].map(fn).join('-')
    : [
        [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(fn).join('-'),
        [date.getHours(), date.getMinutes()].map(fn).join(':'),
      ].join(' ')
}
