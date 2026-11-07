import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/', 'build/', '.generated/', '.react-router/', '.vercel/', '.cache/', 'public/build/'],
  },

  // Base config
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2015,
      },
    },
  },

  // React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...react.configs.flat.recommended,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...react.configs.flat['jsx-runtime'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...reactHooks.configs.flat.recommended,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...jsxA11y.flatConfigs.recommended,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
  },

  // Typescript
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    ...importPlugin.flatConfigs.recommended,
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...importPlugin.flatConfigs.typescript,
  },
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import/newline-after-import': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },

  // Node
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Jbee
  {
    rules: {
      'object-curly-spacing': ['error', 'always'],
      'no-multiple-empty-lines': [
        'error',
        { 'max': 1, 'maxEOF': 1 },
      ],
      'eol-last': [
        'error',
        'always',
      ],
      'semi': ['off'],
      'quotes': [
        'error',
        'single',
      ],
      'indent': ['error', 2],
      'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
      'prefer-const': 'off',
    },
  },
);
