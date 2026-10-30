import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './packages/ui/tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: [['list'], ['junit', { outputFile: 'test-results/playwright.xml' }]],
  use: {
    baseURL: 'http://127.0.0.1:6006',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
