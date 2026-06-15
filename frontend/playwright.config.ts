import { defineConfig, devices } from '@playwright/test';

const configuredBaseUrl = (process.env.PLAYWRIGHT_BASE_URL || '').trim();
const baseURL = configuredBaseUrl.length > 0 ? configuredBaseUrl : 'http://localhost:5173';
const webServer = configuredBaseUrl.length === 0
  ? {
      command: 'npm run dev -- --host 0.0.0.0 --port 5173',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
    }
  : undefined;

export default defineConfig({
  testDir: './WebTests/Tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer,
});