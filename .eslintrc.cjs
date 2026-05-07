module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.next', '.eslintrc.cjs', '**/*.d.ts'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-extra-boolean-cast': 'warn',
  },
}
