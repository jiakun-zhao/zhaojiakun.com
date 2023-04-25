import { defineCollection, z } from 'astro:content'
import { DESCRIPTION, NAME } from '~/config'

const postCollection = defineCollection({
    schema: z.object({
        title: z.string().default(NAME),
        author: z.string().default(NAME),
        description: z.string().default(DESCRIPTION),
        image: z.string().default('og.jpg'),
        create_at: z.date(),
        update_at: z.date(),
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
