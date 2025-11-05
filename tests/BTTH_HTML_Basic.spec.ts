import { test, expect } from '@playwright/test';

test('BTTH HTML Basic Test', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');  

  await page.locator('#username').fill('NhiTTT');
  await page.locator('#email').fill('tran.thi.thao.nhi@gmail.com');
  await page.locator('input[type="radio"][value="female"]').check();
  await page.locator('input[type="checkbox"][value="traveling"]').check();
  await page.selectOption('#interests', 'music');
  await page.selectOption('#country', 'usa');
  await page.locator('#dob').fill('2000-01-01');
  

  await expect(page.locator('input[value="female"]')).toBeChecked();
  await expect(page.locator('input[value="traveling"]')).toBeChecked();

  await page.locator('button[type="submit"]').click();
  await expect(page.locator('#userTable tr', { hasText: 'NhiTTT' })).toBeVisible();

});