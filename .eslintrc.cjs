module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:astro/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['build'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
