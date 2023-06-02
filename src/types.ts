export interface MetaProps {
  title: string
  description?: string
  author?: string
  ogImage?: string
}

export type Post = MetaProps & {
  description: string
  date: string
  path: `/${string}`
  // component: ReturnType<typeof lazy>
  draft?: boolean
  music?: number
}
