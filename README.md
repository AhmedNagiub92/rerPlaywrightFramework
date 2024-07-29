# rerPlaywrightFramework
RER Playwright Automation Framework Documentation
Table of Contents
1.	Overview
2.	Setup Instructions
3.	Usage Guidelines
4.	Writing Tests
5.	Configuration
6.	Running Tests
7.	Examples
8.	Troubleshooting
9.	Best Practices
________________________________________
Overview
This document provides a comprehensive guide to using the Playwright-based automation framework. It covers the setup, usage, and examples to help you get started with writing and running tests efficiently.
Setup Instructions
Prerequisites
•	Node.js (version 14 or higher)
•	npm (version 6 or higher)
Installation
1.	Clone the repository:
      git clone https://github.com/AhmedNagiub92/rerPlaywrightFramework
2.	Navigate to the project directory:
      cd playwright-automation-framework
3.	Install dependencies:
      npm install
      npx playwright install
      Usage Guidelines
      Folder Structure
      •	tests/: Contains all the test files.
      •	pages/: Contains page object models.
      •	util/: Utility functions and helpers.
      •	config/: Configuration files.
      •	Fixtures/: include fixtures for the project.
      •	Test Results/: include test reports.
      Environment Configuration
      Set up environment variables in the .env file. Example:
      databaseUsername=
      databasePassword=
      databaseServer=
      databaseName=
      databasePort=

databaseUsernamePreProd=
databasePasswordPreProd=
databaseServerPreProd=
databaseNamePreProd=
databasePortPreProd=

environment='Test'
Writing Tests
Creating a Test
Tests are written in the tests/ directory. Example:
const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
await page.goto(process.env.BASE_URL);
await expect(page).toHaveTitle('Example Domain');
});
Page Object Model
Use the pages/ directory to create page objects. Example:
class LoginPage {
constructor(page) {
this.page = page;
this.usernameInput = page.locator('#username');
this.passwordInput = page.locator('#password');
this.loginButton = page.locator('#login');
}

async login(username, password) {
await this.usernameInput.fill(username);
await this.passwordInput.fill(password);
await this.loginButton.click();
}
}

module.exports = LoginPage;
Configuration
Configure your tests in playwright.config.js:
module.exports = {
use: {
baseURL: process.env.BASE_URL,
headless: true,
viewport: { width: 1280, height: 720 },
},
timeout: 30000,
retries: 2,
};
Running Tests
Command Line
Use all queries lies on Package Json file.
"scripts": {
"tests:headless": "playwright test",
"tests": "npx playwright test --config=test.config.js --grep qq --headed",
"pre": "npx playwright test --config=preprod.config.js --grep qq --headed",
"tests:test": " npx playwright test --config=test.config.js --grep Regression",
"tests:preprod": "npx playwright test --config=preprod.config.js --grep Regression",
"runP1TestCases": "playwright test --grep @p1",
"lint:fix": "eslint --fix --ext tests.js .",
"lint": "eslint --ext tests.js ."
},
Tags and Filters
Run tests with specific tags:
npx playwright test --grep @tagname
Examples
Example Test Case
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('login test', async ({ page }) => {
const loginPage = new LoginPage(page);
await page.goto(process.env.BASE_URL);
await loginPage.login('user', 'password');
await expect(page).toHaveURL('/dashboard');
});
Checking Element Visibility
To assert if an element is visible:
const element = page.locator('selector');
await expect(element).toBeVisible();
Handling Different Code Based on Element Appearance
To perform actions based on the presence of an element:
if (await page.locator('selector').count() > 0) {
// Element is present, perform actions
} else {
// Element is not present, perform alternative actions
}
Troubleshooting
Common Issues
•	Page not loading: Ensure the base URL is correct and the server is running.
•	Element not found: Use page.waitForSelector() to wait for elements to appear.
•	response is {"error":  "code": "403.2.1" "message": "You are not allowed to access the API", : validate you are setting the environment and using the correct token from admin side
•	Common Errors:
o	'element is not visible': Ensure the element is in the viewport before interacting.
o	'Timeout exceeded': Increase timeout or ensure network conditions are stable.
•	Debugging Tips:
o	Use page.pause() to debug interactively.
o	Add console.log statements to track variable values.
Best Practices
•	Modularize Tests: Use Page Object Models to encapsulate page interactions.
•	Use Environment Variables: Store configurable values in the .env file.
•	Handle Network Conditions: Use waitForLoadState to ensure network stability before interactions.

