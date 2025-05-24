import type { APIRoute } from 'astro'

export const prerender = false

const TOKEN = 'PRECIOUS_METALS_V1.0'

export const POST: APIRoute = async(context) => {
  if (context.request.headers.get('X-Auth') !== TOKEN)
    return new Response('Unauthorized.', { status: 401 })

  try {
    const data = (await context.request.text()).replace(/\s+/g, '')
    await context.locals.runtime.env.JIAKUN_ZHAO_R2.put('PRECIOUS_METALS_V1.0.json', data)
    return new Response('OK.', { status: 200 })
  } catch {
    return new Response('Internal Server Error.', { status: 500 })
  }
}
