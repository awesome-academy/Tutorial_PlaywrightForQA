import { test, expect } from '@playwright/test';
import { loginpage } from '../page/loginPage';

test.describe('Login test using POM and hook', () => {
    let LoginPage;

    test.beforeEach(async ({ page }) => {
        // khởi tạo POM
        LoginPage = new loginpage(page);
        await LoginPage.goto();

    });

    test.afterEach(async ({ page, testInfo }) => {
        // chụp screen nếu bị lỗi
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
        }
    });

    // login pass
    test('login success', async ({page}) => {
        await loginpage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    // login failed
    test('login failed', async({page}) => {
        await loginpage.login('1','1');
        const );
        
    })
})