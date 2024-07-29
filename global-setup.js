// global-setup.js
const { chromium } = require('@playwright/test');
 
module.exports = async (config) => {
  const { baseURL, person } = config.projects[0].use;
  const browser = await chromium.launch({ timeout: 120000 });
  browser.newContext({ignoreHTTPSErrors: true });
 
  const page = await browser.newPage();
  await page.goto(baseURL, { timeout: 140000 });

  await page.context().storageState({ path: 'storageState.json' });
  //await browser.close();
};
