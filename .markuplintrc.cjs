module.export = {
  extends: ['markuplint:recommended'],
  excludeFiles: ['node_modules'],
  parser: {
    '.astro$': '@markuplint/astro-parser',
  },
  nodeRules: [
    {
      selector: 'meta',
      rules: {
        'invalid-attr': {
          options: {
            attrs: {
              property: {
                pattern: '/^(og|twitter):[a-z_]+/',
              },
              content: {
                type: 'Any',
              },
            },
          },
        },
      },
    },
  ],
};
