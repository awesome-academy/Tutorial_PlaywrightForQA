import { expect, test as setup } from '@playwright/test';
const authFile = 'auth.json';

setup('Thực hiện đăng nhập và lưu trạng thái', async ({ page }) => {
  console.log('Bắt đầu chạy setup: Đăng nhập...');
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  console.log('Đăng nhập thành công. Đang lưu trạng thái...');
  await page.context().storageState({ path: authFile });
  console.log(`Đã lưu trạng thái vào file: ${authFile}`);
});
