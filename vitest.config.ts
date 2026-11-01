// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { playwright } from '@vitest/browser-playwright';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    conditions: ['browser']
  },
  plugins: [svelte(), Icons({ compiler: 'svelte' })],
  test: {
    passWithNoTests: true,
    coverage: {
      provider: 'v8'
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['packages/ui/tests/**/*.test.ts'],
          setupFiles: ['packages/ui/tests/setup.ts'],
          server: {
            deps: {
              inline: ['bits-ui', 'runed']
            }
          }
        }
      },
      {
        extends: true,
        plugins: [
          // Runs every story as a test in a real browser; also powers the Storybook UI test widget.
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          }
        }
      }
    ]
  }
});
