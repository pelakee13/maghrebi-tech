import { defineConfig, devices } from '@playwright/test';

const PORT = 3111;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: { baseURL: `http://localhost:${PORT}` },
  // Uses the installed Chrome locally; CI installs Chromium via `playwright install`.
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: process.env.CI ? undefined : 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: process.env.CI ? undefined : 'chrome' } },
  ],
  webServer: {
    command: `pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    // e2e must never send real email: a dummy key + RESEND_DRY_RUN records instead of sending.
    // A real key from the environment is used as-is (e.g. for a manual end-to-end delivery proof).
    env: {
      ...process.env,
      RESEND_API_KEY: process.env.RESEND_API_KEY ?? 'e2e-dry-run-key',
      RESEND_DRY_RUN: process.env.RESEND_REAL_E2E ? '' : '1',
    },
  },
});
