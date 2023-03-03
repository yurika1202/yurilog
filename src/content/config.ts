import { z, defineCollection } from 'astro:content';
const post = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string().optional(),
        alt: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()),
    publishDate: z.string().transform(str => new Date(str)),
    updatedDate: z
      .string()
      .optional()
      .transform(str => (str ? new Date(str) : undefined)),
  }),
});
export const collections = { post };
