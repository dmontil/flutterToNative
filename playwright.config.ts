import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:3002',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: process.env.CI || process.env.E2E_NO_WEBSERVER ? undefined : {
    command: 'HOSTNAME=127.0.0.1 PORT=3002 npm run dev -- -H 127.0.0.1',
    url: 'http://127.0.0.1:3002',
    reuseExistingServer: !process.env.CI,
  },
});
