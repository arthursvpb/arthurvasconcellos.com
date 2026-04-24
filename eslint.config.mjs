import { FlatCompat } from '@eslint/eslintrc';
import nextPlugin from '@next/eslint-plugin-next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * Flat config. The explicit `@next/next` plugin registration below makes
 * Next.js's build-time detection happy (src/dist/lib/eslint/runLintCheck.js
 * iterates flat configs looking for that exact plugin key).
 */
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  ...compat.config({
    extends: ['next/typescript'],
  }),
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'dist/**',
      'coverage/**',
      'next-env.d.ts',
      'public/sw.js',
      'public/workbox-*.js',
      'scripts/**',
      'e2e/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
];
