import { parse, toSeconds } from 'iso8601-duration'
import { z } from 'zod'

// https://www.cnblogs.com/yueyongsheng/p/12574940.html

const schema = z.object({
  isParsed: z.boolean().optional(),
  name: z.string(),
  url: z.string().url(),
  datePublished: z.string().date(),
  timeRequired: z.string().transform(it => toSeconds(parse(it))),
  image: z.string().url(),
  audio: z.object({
    byArtist: z.array(
      z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    ),
    inAlbum: z.object({
      name: z.string(),
      url: z.string().url(),
      image: z.string().url(),
      byArtist: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        }),
      ),
    }),
    genre: z.array(z.string()),
  }),
})

export default defineEventHandler(async (event) => {
  const { url } = getQueryData(event, z.object({ url: z.string().url() }))
  const data = await fetch(url)
    .then(async (res) => {
      const text = await res.text()
      const body = text.match(/id="?schema:(?:song|music-group|music-album)[^>]+>([\s\S]+?)<\/script>/)?.[1]
      return body && JSON.parse(body)
    })
    .catch(() => undefined)
  if (!data)
    throw createServerError(400)
  try {
    const parsed = schema.parse(data)
    parsed.isParsed = true
    setResponseHeader(event, 'Cache-Control', 'max-age=31536000')
    return parsed
  } catch {
    data.isParsed = false
    setResponseHeader(event, 'Cache-Control', 'max-age=31536000')
    return data
  }

  // const search = `${data.name}-${data.audio.byArtist.map((it: any) => it.name).join('/')}`
  // const neteaseCloud = await fetch(`https://music.163.com/api/search/get/web?type=1&offset=0&limit=10&s=${search}`)
  //   .then(async res => (await res.json()).result.songs)
  //   .catch(() => [])
  // const qq = await fetch(`https://c.y.qq.com/soso/fcgi-bin/music_search_new_platform?format=json&w=${search}`)
  //   .then(async res => (await res.json()).data.song.list)
  //   .catch(() => [])
})
