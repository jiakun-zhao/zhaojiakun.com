export interface PostFrontmatter {
  title: string
  description: string
  date: string
  images: Record<string, number>
  'og:image': string
}
