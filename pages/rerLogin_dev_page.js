class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToLogin() {
        await this.page.goto('https://preprodeservices.rer.sa/#/login');
    }

    async enterCredentials(username) {
        await this.page.getByPlaceholder('أدخل رقم الهوية أو رقم الإقامة').fill(username);
    }

    async submit() {

        await this.page.getByRole('main').locator('a').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async handleLoginRedirection() {
        try {
            await this.page.getByRole('button', { name: 'Reload' }).waitFor({ timeout: 30000 });

            // If the element appears, go back
            await this.page.goBack();
            await this.page.waitForLoadState('load');
        } catch (error) {
        }
    }

    async chooseRole() {
        await this.page.getByText('ابدأ الآن').click();
    }

    async loginToRER(username) {
        await this.navigateToLogin();
        await this.enterCredentials(username);
        await this.submit();
        await this.handleLoginRedirection();
        await this.chooseRole();
    }
}

module.exports = { LoginPage };
