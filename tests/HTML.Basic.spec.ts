import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Username:' }).fill('L');
  await page.getByRole('textbox', { name: 'Username:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Username:' }).fill('Ly');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('abc@gmail.com');
  await page.getByRole('radio', { name: 'Female' }).check();
  await page.getByRole('checkbox', { name: 'Reading' }).check();
  await expect(page.getByRole('radio', { name: 'Female' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Reading' })).toBeChecked();

  await page.getByLabel('Interests:').selectOption('music');
  await page.getByLabel('Country:').selectOption('uk');
  await page.getByRole('textbox', { name: 'Date of Birth:' }).fill('2024-09-04');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
  console.log('Đăng ký thành công!');

});
