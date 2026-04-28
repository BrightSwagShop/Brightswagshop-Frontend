import { defineConfig, devices } from '@playwright/test';

const qaseToken = process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN;
const qaseProject = process.env.QASE_TESTOPS_PROJECT || process.env.QASE_PROJECT;

export default defineConfig({
  testDir: './WebTests/Tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ...(qaseToken && qaseProject ? [
      [
        'playwright-qase-reporter',
        {
          mode: 'testops',
          debug: false,
          testops: {
            api: {
              token: qaseToken,
            },
            project: qaseProject,
            uploadAttachments: true,
            run: {
              complete: true,
            },
          },
        },
      ] as [string, Record<string, unknown>]
    ] : [])
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});