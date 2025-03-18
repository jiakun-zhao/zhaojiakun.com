import type { H3Event } from 'h3'
import type { z, ZodType } from 'zod'
import { isUndefined } from '@jiakun-zhao/utils'

const map = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choice',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'unused',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
} as const

export function createServerError(code: keyof typeof map, message?: string) {
  // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
  const mapValue = map[code]
  return createError({
    statusCode: code,
    statusMessage: isUndefined(message) ? mapValue : `${mapValue}: ${message}`,
  })
}

// export function fs<Name extends string>(...files: Name[]) {
//   return Object.fromEntries(files.map(it => [it, new File([], '')])) as Record<Name, File>
// }

export async function getFormData<Schema extends ZodType>(event: H3Event, schema: Schema): Promise<z.infer<Schema>> {
  try {
    const data = await readFormData(event)
    return schema.parse(Object.fromEntries(data.entries()))
  } catch {
    throw createServerError(400)
  }
}

export function getQueryData<T extends ZodType>(event: H3Event, schema: T): z.infer<T> {
  try {
    return schema.parse(getQuery(event))
  } catch {
    throw createServerError(400)
  }
}

export async function getJsonBody<Schema extends ZodType>(event: H3Event, schema: Schema): Promise<z.infer<Schema>> {
  try {
    return schema.parse(await readBody(event))
  } catch {
    throw createServerError(400)
  }
}

export function cloudflare(event: H3Event) {
  return event.context.cloudflare.env
}
