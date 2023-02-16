import { z, defineCollection } from 'astro:content';
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});
export const collections = {
  blog: blogCollection,
};
