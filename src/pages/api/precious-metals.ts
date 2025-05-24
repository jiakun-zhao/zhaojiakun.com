import type { APIRoute } from 'astro'

export const prerender = false

const TOKEN = 'PRECIOUS_METALS_V1.0'

export const POST: APIRoute = async(context) => {
  const headers: HeadersInit = {
    'Access-Control-Allow-Origin': 'https://i.jzj9999.com',
    'Access-Control-Request-Method': 'POST',
  }

  if (context.request.headers.get('X-Auth') !== TOKEN)
    return new Response('Unauthorized.', { status: 401, headers })

  try {
    const data = (await context.request.text()).replace(/\s+/g, '')
    await context.locals.runtime.env.JIAKUN_ZHAO_R2.put('PRECIOUS_METALS_V1.0.json', data)
    return new Response('OK.', { status: 200, headers })
  } catch {
    return new Response('Internal Server Error.', { status: 500, headers })
  }
}
