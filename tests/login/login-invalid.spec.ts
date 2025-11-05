import { test, expect } from '@playwright/test';

test('user login invalid with wrong pw', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('123');
  await page.locator('#login-button').click();

  await expect(page.locator('h3[data-test="error"]')).toBeVisible();
});

test('user login invalid with blank username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page.locator('h3[data-test="error"]')).toBeVisible();
});

test('user login invalid with locked_out_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page.locator('h3[data-test="error"]')).toBeVisible();
});