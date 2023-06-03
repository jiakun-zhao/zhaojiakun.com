import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta extends Head {}
}

export interface Head {
  title: string
  description?: string
  author?: string
  ogImage?: string
  date?: string
  draft?: boolean
  music?: number
  icons?: string[]
}
