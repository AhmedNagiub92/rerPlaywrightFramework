// @ts-check
import { devices } from '@playwright/test';
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig<{
 *  person: { username: string; password: string; dbusername: string; dbpassword: string;
 * dbserver: string; dbname: string; dbport: number } }>}
 */



const config = {
  globalSetup: require.resolve('./global-setup'),
  testDir: './tests',
  timeout: 300 * 1000,
  expect: {
    timeout: 80000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['html', { open: 'never'}],

  ],

  use: {
    //testIdAttribute: 'data-qcauto',
    storageState: 'storageState.json',
    actionTimeout: 120000,
    baseURL: 'https://preprodeservices.rer.sa/#/login',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },


  projects: [
    {
      name: 'RER',
      use: {
        person: {
          username: '1010056347', password: '', dbusername: process.env.databaseUsername, dbpassword: process.env.databasePassword, dbserver: process.env.databaseServer, dbname: process.env.databaseName, dbport: process.env.databasePort,
        },
        ...devices['Desktop chromium'],
      },
    },
  ],
  outputDir: 'test-results/',
};
export default config;
