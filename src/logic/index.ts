export const isDark = usePreferredDark()

export function formatDate(str: string, isShort = true) {
  const date = new Date(str)
  const fn = (n: number) => n < 10 ? `0${n}` : n
  const arr = [
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(fn).join('-'),
    [date.getHours(), date.getMinutes()].map(fn).join(':'),
  ]
  return isShort ? arr[1] : arr.join(' ')
}
