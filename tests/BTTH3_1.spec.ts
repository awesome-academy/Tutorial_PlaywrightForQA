import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';

test.describe('Login test using POM and hook', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        // khởi tạo POM
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // ghi lại màn hình khi login success
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({
                path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`,
                fullPage: true
            });
        }
    });

    // login pass
    test('login success', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    // login failed
    test('login failed', async ({ page }) => {
        await loginPage.login('standard_user', '1');
        const errorText = await loginPage.geterrormessage();
        expect(errorText).toContain('Epic sadface');
    });
});
