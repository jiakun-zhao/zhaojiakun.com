/* eslint perfectionist/sort-objects: "error" */

import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: 'prettier',
    markdown: 'prettier',
  },
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    'no-console': 'warn',
    'style/brace-style': ['warn', '1tbs'],
    'style/jsx-one-expression-per-line': 'off',
    'style/jsx-quotes': ['warn', 'prefer-single'],
    'ts/ban-ts-comment': 'off',
    'ts/no-unused-expressions': 'off',
    'unused-imports/no-unused-imports': 'warn',
  },
  unocss: {
    overrides: {
      'unocss/order': 'warn',
    },
  },
  vue: {
    overrides: {
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
})
