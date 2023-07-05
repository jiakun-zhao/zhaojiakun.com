import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description?: string
    author?: string
    ogImage?: string
    subtitle?: string
    date?: string
    hideHeader?: boolean
    draft?: boolean
  }
}
