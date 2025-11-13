import { expect } from '@playwright/test';
import { test } from './fixtures/login.fixture';

// Test 1: Kiểm tra dashboard sau khi login
test('Kiểm tra dashboard hiển thị đúng', async ({ demoOrange }) => {
  await expect(demoOrange.getByText('Swag Labs')).toBeVisible();
});

test('verify sauce inventory products', async ({ demoOrange }) => {
  // Verify we're on inventory page
  await expect(demoOrange.getByText('Products')).toBeVisible();

  // Verify all 6 products are displayed
  const inventoryItems = demoOrange.locator('[data-test="inventory-item"]');
  await expect(inventoryItems).toHaveCount(6);

  // Verify specific products exist
  await expect(demoOrange.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(demoOrange.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(demoOrange.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  await expect(demoOrange.getByText('Sauce Labs Onesie')).toBeVisible();
  await expect(demoOrange.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
});
