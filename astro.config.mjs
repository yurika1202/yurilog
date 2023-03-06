import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';

export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeToc, { headings: ['h2', 'h3'], nav: true }]],
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
