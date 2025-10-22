import { expect, test } from '@playwright/test';
test('UI', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register');
  await expect(page.locator('h2')).toHaveText('Register');
  await expect(page.locator('input[name="firstname"]')).toBeVisible();
  await expect(page.locator('input[name="lastname"]')).toBeVisible();
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="pssword"]')).toBeVisible();
});
test('register', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register');
  await page.locator('input[name="firstname"]').fill('hoang');
  await page.locator('input[name="lastname"]').fill('hoang');
  await page.locator('input[name="username"]').fill('hoang');
  await page.locator('input[name="password"]').fill('hoang');
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('div.alert.alert-success')).toHaveText('Registration successful');
});
test('login', async ({ page }) => {
  await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  await page.locator('input[name="username"]').fill('hoang');
  await page.locator('input[name="password"]').fill('hoang');
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL('https://globalsqa.com/angularJs-protractor/registration-login-example/#/')
});
