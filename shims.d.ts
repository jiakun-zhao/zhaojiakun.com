import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description?: string
    og_image?: string

    type?: 'posts' | 'notes'

    date: RouteMeta['type'] extends undefined ? undefined : string
    draft:  RouteMeta['type'] extends undefined ? undefined : boolean
  }
}

declare global {
  var shiki: typeof import('shiki') | undefined
}
