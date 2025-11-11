import { test, expect } from '@playwright/test';

test.describe('Check item', () => {
  test.beforeEach('open page & login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

  test('Check number of item', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
});

test.describe('Check cart', () => {
  test.beforeEach('open page & login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

  test('Check cart', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#shopping_cart_container');
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });
});