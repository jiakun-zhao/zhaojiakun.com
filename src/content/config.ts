import { defineCollection, z } from 'astro:content'
import { NAME } from '~/config'

const postCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        create_at: z.date(),
        update_at: z.date(),
        author: z.string().default(NAME),
    }),
})

const momentCollection = defineCollection({
    schema: z.object({
        images: z.array(z.string()).optional(),
    }),
})

export const collections = {
    posts: postCollection,
    moments: momentCollection,
}
