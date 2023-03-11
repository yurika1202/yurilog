import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import rehypeExternalLinks from 'rehype-external-links';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkCodeTitle from 'remark-code-title';
import remarkGemoji from 'remark-gemoji';

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true,
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeToc,
        {
          headings: ['h2', 'h3'],
          nav: true,
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: 'nofollow',
        },
      ],
      rehypeAccessibleEmojis,
    ],
    remarkPlugins: [remarkCodeTitle, remarkGemoji],
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'dark-plus',
        langs: ['js', 'ts', 'html', 'css', 'scss', 'astro', 'mdx', 'shellscript'],
        wrap: false,
      },
      extendDefaultPlugins: true,
    }),
  ],
});
