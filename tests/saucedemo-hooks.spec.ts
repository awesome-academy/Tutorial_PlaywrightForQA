import { expect, test } from '@playwright/test';
test.describe('SauceDemo - Nhóm Test Inventory', () => {
  test.beforeEach(async ({ page }) => {
    console.log(`Đang chạy beforeEach: Login...`);
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Đang chạy afterEach cho test: ${testInfo.title}`);

    // Chụp screenshot nếu test fail
    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`Test ${testInfo.title} đã FAILED. Đang chụp screenshot...`);

      const screenshotName = `${testInfo.title.replace(/\s+/g, '-')}-${Date.now()}.png`;
      const screenshotPath = `screenshots-failed/${screenshotName}`;

      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Đã lưu screenshot tại: ${screenshotPath}`);
    }

    // Logout
    console.log('Đang thực hiện logout...');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('Test 1: Kiểm tra URL sau khi login chứa /inventory', async ({ page }) => {
    console.log('Đang chạy Test 1: Kiểm tra URL...');
    await expect(page).toHaveURL(/.*inventory.html/);
  });
  test('Test 2: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên', async ({ page }) => {
    console.log('Đang chạy Test 2: Kiểm tra tên sản phẩm...');
    const expectedName = 'Sauce Labs Backpack';
    const firstProductLocator = page.locator('.inventory_item_name').first();
    await expect(firstProductLocator).toHaveText(expectedName);
  });
});
