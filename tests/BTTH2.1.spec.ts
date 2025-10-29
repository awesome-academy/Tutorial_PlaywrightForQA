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

  // 1.2 Login thất bại: sai password
  test('Login thất bại với sai password', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });

  // 1.3 Login thất bại: bỏ trống username
  test('Login thất bại khi bỏ trống username', async ({ page }) => {
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username is required');
  });

  // 1.4 Login với locked_out_user
  test('Login thất bại với locked_out_user', async ({ page }) => {
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
  });
});

