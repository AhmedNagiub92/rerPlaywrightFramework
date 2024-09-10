// @ts-check
const { test } = require('@playwright/test');
const {LoginPage} = require('../pages/rerLogin_dev_page');
const { RerFRPage } = require('../pages/rerFR_dev_page');
const { PropertyDetailsPage } = require('../pages/propertyDetails_dev_page');
const userName = '1010056347';
const attachmentValue='test-data/sample.pdf';
test('Happy Scenario for First Registration with Login', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const rerFR = new RerFRPage(page);
    const propertyDetails = new PropertyDetailsPage(context);

    // Step 1: Login
    await loginPage.loginToRER(userName); // This should now correctly reference the loginToRER method

    // Step 2: Access internal API as part of the workflow
    await propertyDetails.accessInternalAPI();

    // Step 3: First Registration Process
    await rerFR.selectFirstRegistration();
    await rerFR.startService();
    await rerFR.fillRegistrationDetails('479202375321', '1-3-1446');
    await rerFR.continue();
    await rerFR.continue();
    await rerFR.waitForCanvas();
    await rerFR.fillPropertyDetails('منطقة الرياض', 'امارة منطقة الرياض', 'المروج', '1578/أج', '2625');
    await rerFR.selectOnCanvas({ x: 309, y: 369 });
    await rerFR.fillAdditionalDetails('1: 74ae0000-0667-b445-997e-08db5f50b582', '2', attachmentValue, 'test');
    await rerFR.saveAndSubmit();

});
