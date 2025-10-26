import { test, expect } from '@playwright/test';
test.describe('Demo thứ tự hook và chụp screenshot khi fail', () => {
  test.beforeAll(async () => {
    console.log('Bắt đầu chạy nhóm test');
  });
  test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Login');
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });
  test('Kiểm tra login thành công', async ({ page }) => {
    await expect(page).toHaveURL(/.*inventory/);
  });
  test('Kiểm tra tên sản phẩm', async ({ page }) => {
    const firstItem = page.locator('.inventory_item_name').first();
    await expect(firstItem).toHaveText('Tên sản phẩm sai');
  });
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      console.log('Test bị fail → chụp screenshot');
      await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
    }
  });
  test.afterAll(async () => {
    console.log('Kết thúc nhóm test');
  });
});
