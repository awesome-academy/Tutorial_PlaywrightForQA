import { expect, test } from '@playwright/test';
test.describe('Nhóm Test với đầy đủ Hooks', () => {
  test.beforeAll(async () => {
    console.log('>>> [beforeAll] Bắt đầu chạy nhóm test <<<');
  });

  test.beforeEach(async ({ page }) => {
    console.log('-- [beforeEach] Đang thực hiện Login...');
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`-- [afterEach] Đang dọn dẹp cho test: "${testInfo.title}"`);
    if (testInfo.status !== testInfo.expectedStatus) {
      console.warn(`!! [afterEach] Test "${testInfo.title}" FAILED. Đang chụp screenshot...`);
      const screenshotPath = `test-results/FAILED-${testInfo.title.replace(/\s+/g, '-')}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.warn(`!! [afterEach] Đã lưu screenshot tại: ${screenshotPath}`);
    } else {
      console.log(`-- [afterEach] Test "${testInfo.title}" PASSED.`);
    }
  });

  test.afterAll(async () => {
    console.log('>>> [afterAll] Kết thúc nhóm test <<<');
  });

  //CÁC TEST CASE

  test('Test 1 (PASS): Kiểm tra tiêu đề trang "Products"', async ({ page }) => {
    console.log('   [Test 1] Đang chạy test PASS...');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Test 2 (FAIL): Cố tình làm fail để kiểm tra screenshot', async ({ page }) => {
    console.log('   [Test 2] Đang chạy test CỐ TÌNH FAIL...');
    await expect(page.locator('.title')).toHaveText('Wrong Title');
  });

  test('Test 3 (PASS): Kiểm tra icon giỏ hàng hiển thị', async ({ page }) => {
    console.log('   [Test 3] Đang chạy test PASS (lần 2)...');
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
  });
});
