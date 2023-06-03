declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module 'virtual:posts' {
  import type { RouteRecordRaw } from 'vue-router'
  const posts: RouteRecordRaw[]
  export default posts
}