import { expect, test } from '@playwright/test';
test('login', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');
  await page.locator('#username').fill('phan.chinh.hoang');
  await page.locator('#email').fill('phan.chinh.hoang@sun-asterisk.com');
  await page.locator('input[type="radio"][value="male"]').check();
  await page.locator('input[type="checkbox"][value="reading"]').check();
  expect(page.locator('input[value="male"]')).toBeChecked();
  await expect(page.locator('input[value="reading"]')).toBeChecked();
  await page.locator('#interests').selectOption('technology');
  await page.locator('#country').selectOption('usa');
  await page.locator('#dob').fill('1996-08-19');
  await page.locator('button[type="submit"]').click();
  const userRow = page.locator('table tbody tr');
  await expect(userRow).toContainText('phan.chinh.hoang');
  await expect(userRow).toBeVisible();
  console.log('✅ Đăng ký thành công!');
});
