module.exports = {
  keepOverrides: false,
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.md', 'README'],
      options: {
        parser: 'markdown-nocjsp',
      },
    },
    {
      files: ['*.mdx'],
      options: {
        parser: 'mdx-nocjsp',
      },
    },
  ],
};
