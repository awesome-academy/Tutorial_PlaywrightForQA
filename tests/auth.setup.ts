import { expect, test as setup } from '@playwright/test';

// Tên file mà chúng ta sẽ lưu trạng thái đăng nhập
const authFile = 'auth.json';

setup('Thực hiện đăng nhập (Saucedemo) và lưu trạng thái', async ({ page }) => {
  console.log('Chạy setup: Đăng nhập để tạo auth.json...');

  // 1. Đi đến trang login
  await page.goto('https://www.saucedemo.com/');

  // 2. Thực hiện đăng nhập
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 3. Chờ để đảm bảo đăng nhập thành công
  await expect(page.locator('.inventory_list')).toBeVisible();

  console.log('Đăng nhập thành công. Đang lưu trạng thái...');

  // 4. Lưu trạng thái (cookies, local storage) vào file auth.json
  // page.context() đại diện cho "phiên làm việc" (context) của trang đó
  await page.context().storageState({ path: authFile });

  console.log(`Đã lưu trạng thái vào file: ${authFile}`);
});
