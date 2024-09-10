class PropertyDetailsPage {
    constructor(context) {
        if (!context) {
            throw new Error('Browser context is required');
        }
        this.context = context;
    }

    async accessInternalAPI() {
        const page = await this.context.newPage();
        try {
            await page.goto('https://internal.api.rer.nft:5543/gateway/internal/GDMS/SDI/v1.0/MapServer/12?f=json', { waitUntil: 'load' });
        } catch (error) {
            console.error('Error accessing internal API:', error);
            await page.getByRole('button', { name: 'Advanced' }).click();
               await page.getByRole('link', { name: 'Proceed to internal.api.rer.' }).click();
            await page.waitForLoadState('domcontentloaded');
        } finally {
            await page.close();
        }
    }
}

module.exports = { PropertyDetailsPage };
