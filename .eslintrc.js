module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
    amd: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'eslint-plugin-react',
    'prettier',
    'import',
    'simple-import-sort',
    'better-styled-components',
    'react-hooks'
  ],
  rules: {
    'import/no-unresolved': 2,
    'import/export': 2,
    'import/default': 2,
    'import/namespace': 2,
    'import/named': 2,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prefer-stateless-function': [0],
    'react/jsx-indent': [0],
    'react/sort-comp': [0],
    'react/destructuring-assignment': [0],
    'react/forbid-prop-types': [0],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'no-use-before-define': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'jsx-quotes': ['error', 'prefer-double'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    camelcase: 'off',
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    semi: 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': 2,
    'no-console': 1,
    'no-debugger': 1,
    'better-styled-components/sort-declarations-alphabetically': 2,
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
};
