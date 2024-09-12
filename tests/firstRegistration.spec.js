// @ts-check
import { LoginPage } from '../pages/rerLogin_dev_page';
import { RerFRPage } from '../pages/rerFR_dev_page';
import { PropertyDetailsPage } from '../pages/propertyDetails_dev_page';
import test from '@playwright/test';
const userName = '1010056347';
const attachmentValue='test-data/sample.pdf';
const parcelNumbers = [
    '690206407790', '590236405555', '691234567790', '496543217790', '324643217790', 
    '924643217790', '496543217120', '990206407706', '553761495940', '245578805330', 
    '877725180830', '479202375227', '187016030291', '810976012185', '676393876230', 
    '345352767097', '479202375316', '479202375317', '479202375318', '479202375319', 
    '479202375320', '479202375321', '479202375322', '479202375323', '479202375324', 
    '479202375326', '479202375327', '479202375328', '479202375329', '479202375330', 
    '479202375331', '479202375332', '479202375333', '479202375334', '479202375335', 
    '479202375336', '479202375337', '479202375338', '479202375339', '479202375340', 
    '479202375341', '479202375342', '479202375343', '479202375344', '479202375345', 
    '479202375346', '479202375347', '479202375348', '479202375349', '479202375350', 
    '479202375351', '479202375352', '479202375353', '479202375354', '479202375355', 
    '479202375356', '479202375357', '479202375358', '479202375359', '479202375310', 
    '479202375311', '479202375312', '479202375314', '479202375315'
];

function getRandomParcelNumber() {
    const randomIndex = Math.floor(Math.random() * parcelNumbers.length);
    return parcelNumbers[randomIndex];
};

test('Happy Scenario for First Registration with Login', async ({ page, context }) => {
    const rerLoginPage = new LoginPage(page); 
    const rerFR = new RerFRPage(page);
    const propertyDetails = new PropertyDetailsPage(context);

    // Step 1: Login
    await rerLoginPage.loginToRER(userName); // This should now correctly reference the loginToRER method

    // Step 2: Access internal API as part of the workflow
    await propertyDetails.accessInternalAPI();

    // Step 3: First Registration Process
    await rerFR.selectFirstRegistration();
    await rerFR.startService();
    const randomParcelNumber = getRandomParcelNumber();
    await rerFR.fillRegistrationDetails(randomParcelNumber, '1-3-1446');
    await rerFR.continue();
    await rerFR.continue();
    await rerFR.waitForCanvas();
    await rerFR.fillPropertyDetails('منطقة الرياض', 'امارة منطقة الرياض', 'المروج', '1578/أج', '2625');
    await rerFR.selectOnCanvas({ x: 309, y: 369 });
    await rerFR.fillAdditionalDetails('1: 74ae0000-0667-b445-997e-08db5f50b582', '2', attachmentValue, 'test');
    await rerFR.saveAndSubmit();

});
