/* eslint-disable */
module.exports = {
  root: true,

  env: {
    node: true
    // browser: true,
    // es2021: true
  },

  extends: [
    'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    // '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],

  // plugins: ['vue', '@typescript-eslint'],

  parserOptions: {
    ecmaVersion: 2021,
    // ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures : {
      jsx: false
    }
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 0,
    'vue/html-indent': ['error', 4],
    'vue/html-self-closing': 0,
    'prefer-const': 0
  },

  ignorePatterns: [
    'node_modules/',
    '*.js',
    'shims-vue.d.ts'
    // 'tailwind.config.js',
    // 'postcss.config.js',
    // 'jest.config.js'
  ],

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
