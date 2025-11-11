import { test, expect } from '@playwright/test';

test.beforeAll(async ({ browser }) => {
    console.log('Bat dau chay nhom test');
});

test.beforeEach('open page & login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

test('check URL after login', async ({ page }) => {
  await expect(page).toHaveURL(/inventory/);
});

test.afterEach('screenshot when fail', async ({ page }, testInfo ) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
});

test.afterAll(async () => {
    console.log('Ket thuc nhom test');
});