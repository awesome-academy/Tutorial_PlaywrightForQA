// tests/inventory.spec.js

import { checkpage } from "../page/checkpage";

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page/LoginPage');
const { InventoryPage } = require('../page/checkpage');

// Sử dụng test.describe để gom nhóm các test liên quan
test.describe('Check login and viewpage', () => {
    
    // Khai báo biến
    let loginPage;
    let inventoryPage;


    test.beforeEach(async ({ page }) => {
        console.log('Đăng nhập');
        loginPage = new LoginPage(page);
        inventoryPage = new checkpage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        // đăng nhập thành công
        await expect(page).toHaveURL(/inventory/); 
        console.log(' Đăng nhập thành công');
    });


    test.afterEach(async ({ page }, testInfo) => {
        console.log('Clear');

        // 1. Chụp screenshot nếu test thất bại
        if (testInfo.status !== testInfo.expectedStatus) {
            // Tạo đường dẫn file ảnh
            const screenshotPath = testInfo.outputPath(`failure_screenshot_${testInfo.title.replace(/\s/g, '_')}.png`);
            console.log(`!!! Test thất bại (${testInfo.title}). Đang chụp screenshot tại: ${screenshotPath}`);
            await page.screenshot({ path: screenshotPath });
        }

        // 2. Thực hiện Đăng xuất
        await inventoryPage.logout();
        
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        console.log('Logout and clear');
    });

    test('Test 1: Check URL  sau khi đăng nhập', async ({ page }) => {
        
        await expect(page).toHaveURL(/inventory/);
    });
    
    test('Test 2: Kiểm tra tên sản phẩm đầu tiên hiển thị đúng', async () => {
        const expectedProductName = 'Sauce Labs Backpack';
        
        const actualProductName = await inventoryPage.getFirstProductName();

        await expect(actualProductName).toBe(expectedProductName);
    });

});