export interface DefaultFrontMatter {
  title: string
  description: string
  og_image?: string
}

export interface PostFrontMatter extends DefaultFrontMatter {
  date: string
  images?: { [key: string]: number }
}
