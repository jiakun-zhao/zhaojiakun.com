import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter: any
  }
}

declare global {
  var shiki: typeof import('shiki') | undefined
}
