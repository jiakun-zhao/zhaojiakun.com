export function useUmami() {
  if (import.meta.dev)
    return

  useHead({
    script: [{
      'defer': true,
      'src': 'https://cloud.umami.is/script.js',
      'data-website-id': 'd61c4dda-37f9-4548-b0dc-35623337709f',
    }],
  })
}
