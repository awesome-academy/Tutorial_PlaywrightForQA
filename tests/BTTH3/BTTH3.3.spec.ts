import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const screenshotDir = path.join(__dirname, '..', 'screenshots-hooks');

test.describe('Bài 3 - Thứ tự hook và quản lý tài nguyên', () => {

  // Chạy 1 lần trước tất cả test trong group
  test.beforeAll(async () => {
    // tạo thư mục lưu screenshot nếu chưa có
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    console.log('Bắt đầu chạy nhóm test');
  });

  // Chạy trước mỗi test: login
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    console.log('beforeEach: Login xong');
  });

  // Chạy sau mỗi test: chụp screenshot nếu fail -> sau đó logout
  test.afterEach(async ({ page }, testInfo) => {
    // testInfo.status so sánh với testInfo.expectedStatus để phát hiện fail
    if (testInfo.status !== testInfo.expectedStatus) {
      const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
      const filePath = path.join(screenshotDir, `${safeTitle}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`afterEach: Test failed -> screenshot saved: ${filePath}`);
    } else {
      console.log('afterEach: Test passed -> không chụp screenshot');
    }

    // Logout dọn dẹp
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    console.log('afterEach: Logout xong');
  });

  // Chạy 1 lần sau tất cả test trong group
  test.afterAll(async () => {
    console.log('Kết thúc nhóm test');
  });

  // --------- Tests ----------
  test('Test A - URL sau khi login chứa /inventory (expected PASS)', async ({ page }) => {
    await expect(page).toHaveURL(/.*inventory/);
    console.log('Test A executed');
  });

  test('Test B - Test cố tình FAIL để kích hoạt afterEach', async ({ page }) => {
    // Test này cố tình sẽ fail (so sánh tên sản phẩm với chuỗi sai)
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText('THIS WILL FAIL');
    console.log('Test B executed (nếu đến đây là không fail)');
  });
});
