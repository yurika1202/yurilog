import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'dark-plus',
        langs: ['js', 'ts', 'html', 'css', 'scss', 'astro', 'mdx', 'shellscript'],
        wrap: false,
      },
      draft: true,
    }),
  ],
});
