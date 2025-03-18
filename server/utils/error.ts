export default defineNitroErrorHandler((error, event) => {
  if (import.meta.dev) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  const value = error.cause as { statusCode: number, statusMessage: string }
  setResponseHeader(event, 'Content-Type', 'text/plain')
  setResponseStatus(event, value.statusCode)
  return send(event, value.statusMessage)
})
