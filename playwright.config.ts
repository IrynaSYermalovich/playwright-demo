import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
export const STORAGE_STATE = 'playwright/.auth/user.json';
export const API_HEADERS = 'playwright/.auth/api-headers.json';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  globalSetup: require.resolve('./global-setup.ts'),
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  reporter: [
    ['html'],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        suiteTitle: true,
        detail: true,
        environmentInfo: {},
      },
    ],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: 'https://enotes.pointschool.ru/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', // Record video for each test, but remove all videos from successful test runs.
    testIdAttribute: 'id', // set attribute for getByTestId
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'authsetup',
      testMatch: /auth-setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['authsetup'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    //   dependencies: ['authsetup'],
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    //   dependencies: ['authsetup'],
    // },
  ],
});
