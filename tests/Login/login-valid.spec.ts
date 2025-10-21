import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });
test.describe('SauceDemo Login Tests', () => {

  // Trước mỗi test: mở trang login
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // 1.1 Login thành công
  test('Login thành công với standard_user', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Kiểm tra đã chuyển sang trang product
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });
});
