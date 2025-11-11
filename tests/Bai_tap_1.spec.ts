import { test, expect } from '@playwright/test';

test.beforeEach('open page & login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

test('check URL after login', async ({ page }) => {
  await expect(page).toHaveURL(/inventory/);
});

test('check name of first item', async ({ page }) => {
  await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
});

test.afterEach('screenshot when fail & log out', async ({ page }, testInfo ) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
  });