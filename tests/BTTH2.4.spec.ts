import { test, expect } from '@playwright/test';

test('BT4 - Đăng nhập và đăng xuất trên Sauce Demo', async ({ page }) => {
  // 1. Truy cập vào trang login
  await page.goto('https://www.saucedemo.com/');

  // 2. Nhập thông tin tài khoản hợp lệ
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // 3. Nhấn nút Login
  await page.click('[data-test="login-button"]');

  // 4. Xác nhận đã đăng nhập thành công (đã vào trang inventory)
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // 5. Mở menu bên trái
  await page.click('#react-burger-menu-btn');

  // 6. Click nút Logout trong menu
  await page.click('#logout_sidebar_link');

  // 7. Kiểm tra quay lại màn hình login
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // 8. (Tuỳ chọn) Kiểm tra nút Login hiển thị lại
  const loginButton = page.locator('[data-test="login-button"]');
  await expect(loginButton).toBeVisible();

  console.log('✅ Đăng xuất thành công, quay lại trang login.');
});
