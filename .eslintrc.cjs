module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    'no-console': import.meta.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'react-refresh/only-export-components': ["warn", { allowConstantExport: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
