import { test } from '@playwright/test';

test('Save login state', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForURL('**/inventory.html');

  // Lưu storageState hợp lệ do server cấp
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
  console.log('✅ Auth state saved to: playwright/.auth/user.json');
});
