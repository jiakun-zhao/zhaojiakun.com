import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        author: z.string().optional(),
        description: z.string(),
        image: z.string().optional(),
        draft: z.boolean().optional(),
        style: z.string().optional(),
        date: z.object({
            create_at: z.string(),
            update_at: z.string(),
        }),
    }),
})

const momentCollection = defineCollection({})

export const collections = {
    posts: postCollection,
    moments: momentCollection,
}
