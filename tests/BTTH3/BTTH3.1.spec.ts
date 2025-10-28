import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Setup & Teardown Example', () => {
  
  // Trước mỗi test: mở trang + login
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  // Sau mỗi test: chụp screenshot nếu fail + logout
  test.afterEach(async ({ page }, testInfo) => {
    // Nếu test fail thì chụp ảnh
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
    }

    // Thực hiện logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
  });

  // Test 1: Kiểm tra URL sau khi login
  test('Kiểm tra URL sau khi login chứa /inventory', async ({ page }) => {
    await expect(page).toHaveURL(/.*inventory/);
  });

  // Test 2: Kiểm tra tên sản phẩm đầu tiên
  test('Kiểm tra sản phẩm đầu tiên hiển thị đúng tên', async ({ page }) => {
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText('Sauce Labs Backpack');
  });

});
