import { isString } from '@jiakun-zhao/utils'

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)
  if (!isString(url)) {
    setResponseStatus(event, 400)
    return
  }
  return await fetch(url).then((res) => {
    const items = [
      'content-type',
      'cache-control',
      'date',
      'etag',
    ]
    res.headers.forEach((value, key) => items.includes(key) && setResponseHeader(event, key, value))
    return res.text()
  })
})
