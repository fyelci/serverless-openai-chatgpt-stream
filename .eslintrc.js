module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // '@typescript-eslint/camelcase': false,
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/no-parameter-properties': 2,
    '@typescript-eslint/no-non-null-assertion': 2,
    'import/no-unresolved': 0,
    'import/order': 'error',
    'quote-props': ['error', 'as-needed'],
    'no-console': 'error',
  },
};
