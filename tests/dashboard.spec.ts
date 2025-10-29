import { expect } from '@playwright/test';
import { test } from './fixtures/login.fixture';

test('Kiểm tra dashboard hiển thị đúng', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Swag Labs')).toBeVisible();
});

test('verify sauce inventory products', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Products')).toBeVisible();
  const inventoryItems = loggedInPage.locator('[data-test="inventory-item"]');
  await expect(inventoryItems).toHaveCount(6);
  await expect(loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Onesie')).toBeVisible();
  await expect(loggedInPage.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
});

test('add sauce inventory products', async ({ loggedInPage }) => {
  await loggedInPage.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartBadge = loggedInPage.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
});
test('verify cart after adding product', async ({ loggedInPage }) => {
  await loggedInPage.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await loggedInPage.click('.shopping_cart_link');
  await expect(loggedInPage.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});
