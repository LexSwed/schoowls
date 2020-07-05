module.exports = {
  ...require('@prisma-labs/prettier-config'),
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
  overrides: [
    {
      files: ['*.yml', '*.json', '*.prisma'],
      options: {},
    },
  ],
}
