
const { expect } = require('@playwright/test');
const attachmentValue = 'test-data/sample.pdf';
class RerFRPage {
    constructor(page) {
        this.page = page;
    }

    async selectFirstRegistration() {
        await this.page.getByRole('link', { name: 'التسجيل العيني الأول تقديم طلب تسجيل عيني أول للملكيات العقارية' }).click();
    }

    async startService() {
        await this.page.getByRole('link', { name: 'بدء الخدمة ' }).click();
    }

    async fillRegistrationDetails(certificateNumber, date) {
        await this.page.getByPlaceholder('الرجاء إدخال رقم الصك').fill(certificateNumber);
        await this.page.getByPlaceholder('yyyy-mm-dd').click();
        await this.page.getByLabel(date, { exact: true }).getByText('1').click();
    }

    async continue() {
        await this.page.getByText('متابعة', { exact: true }).click();
    }

    async waitForCanvas() {
        await this.page.waitForSelector('canvas', { state: 'visible' });
    }

    async fillPropertyDetails(region, province, neighborhood, planNumber, pieceNumber) {
        await this.page.locator('p-dropdown').filter({ hasText: 'اسم المنطقة' }).locator('div').first().click();
        await this.page.waitForTimeout(2000);        
        await this.page.getByText(region).nth(0).click();
        await this.page.locator('span').filter({ hasText: 'اسم المحافظة' }).click();
        await this.page.getByText(province).click();
        await this.page.locator('span').filter({ hasText: 'اسم الحي' }).click();
        await this.page.locator('p-overlay').filter({ hasText: neighborhood }).getByRole('textbox').fill(neighborhood);
        await this.page.getByLabel(neighborhood).click();
        await this.page.getByPlaceholder('رقم المخطط').fill(planNumber);
        await this.page.getByPlaceholder('رقم القطعة').fill(pieceNumber);
        await this.page.getByRole('button', { name: 'بحث' }).click();
    }

    async selectOnCanvas(position) {
        await this.page.locator('canvas').click({
            position: position
        });
    }

    async fillAdditionalDetails(dropdownOption, spinNumber, attachmentValue, notes) {
        await this.page.locator('select').selectOption(dropdownOption);
        await this.page.getByRole('spinbutton').fill(spinNumber);
        await this.page.getByText('متابعة', { exact: true }).click();
        await this.page.locator('a').filter({ hasText: 'إضافة' }).click();
        await this.page.locator('#rrrType').getByText('اختار').click();
        await this.page.waitForLoadState('networkidle'); 
        await this.page.waitForTimeout(2000);        
        await this.page.getByText('رهن').click();
        await this.page.getByLabel('نوع صاحب الحق').selectOption('28001');
        await this.page.getByLabel('نوع هوية صاحب الحق').selectOption('30002');
        await this.page.getByLabel('رقم هوية صاحب الحق').fill('1071236473');
        await this.page.getByRole('textbox', { name: 'yyyy-mm-dd' }).click();
        await this.page.getByLabel('1-3-1446', { exact: true }).getByText('1').click();
        await this.page.getByRole('button', { name: 'تحقق' }).click();
        await this.page.locator('xpath=/html/body/div/div/div[2]/app-add-rrr-new/div/div/div[9]/div/file-management/div/div[1]/p-fileupload/div/div[1]/span/input').setInputFiles(attachmentValue);
        await this.page.getByPlaceholder('الملاحظات المتعلقة بالحقوق والقيود').fill(notes);
    }

    async saveAndSubmit() {
        await this.page.getByRole('button', { name: 'حفظ' }).click();
        await this.page.getByText('متابعة', { exact: true }).click();
        await this.page.getByText('تمت الإضافة بنجاح').click();
        await this.page.locator('.p-checkbox-box').first().click();
        await this.page.locator('div:nth-child(3) > .p-element > .p-checkbox > .p-checkbox-box').click();
        await this.page.getByRole('button', { name: 'تقديم الطلب' }).click();
        await this.page.locator('#first').fill('1');
        await this.page.locator('#second').fill('2');
        await this.page.locator('#third').fill('3');
        await this.page.locator('#fourth').fill('4');
        await this.page.getByRole('button', { name: 'التحقق' }).click();
        await expect(this.page.getByRole('heading', { name: 'تم انشاء طلبك بنجاح' })).toBeVisible();

    }
}

module.exports = { RerFRPage };
