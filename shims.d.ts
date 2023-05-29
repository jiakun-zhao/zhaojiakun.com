import 'vue-router'

declare global {
  var shiki: typeof import('shiki') | undefined
}

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description?: string
    og_image?: string
    date?: string
    draft?: boolean
    music?: number
  }
}
