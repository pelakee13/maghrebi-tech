import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

// Constitution II: only logical (direction-agnostic) Tailwind utilities are allowed.
const PHYSICAL = '(^|\\s)-?(ml|mr|pl|pr|left|right|rounded-l|rounded-r|border-l|border-r)(-|\\s|$)';
const PHYSICAL_TEXT = '(^|\\s)text-(left|right)(\\s|$)';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'coverage/**', 'playwright-report/**', 'test-results/**', 'eslint.config.mjs'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: `Literal[value=/${PHYSICAL}/]`,
          message: 'Use logical utilities (ms-*, me-*, ps-*, pe-*, start-*, end-*) instead of physical left/right.',
        },
        {
          selector: `Literal[value=/${PHYSICAL_TEXT}/]`,
          message: 'Use text-start / text-end instead of text-left / text-right.',
        },
      ],
    },
  },
];

export default eslintConfig;
