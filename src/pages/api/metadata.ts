import type { APIRoute } from 'astro'
import { version } from '#pkg'

export const prerender = false

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      version,
    }),
  )
}
