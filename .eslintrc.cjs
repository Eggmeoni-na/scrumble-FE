const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'jsx-a11y', 'react-refresh'],
  rules: {
    'prettier/prettier': 'off',
    'no-console': isProduction ? 'error' : 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/self-closing-comp': 'warn',
    'prefer-const': 'warn',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'arrow-body-style': ['warn', 'as-needed'],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { components: ['Link'], specialLink: ['to'] }],
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'jsx-a11y/no-autofocus': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
