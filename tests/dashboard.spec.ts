import { expect, test } from './fixtures/inventory.fixture';

// Test 1: Kiểm tra dashboard sau khi login
test('Kiểm tra dashboard hiển thị đúng', async ({ inventoryPage }) => {
  await expect(inventoryPage.getByText('Swag Labs')).toBeVisible();
});

test('verify sauce inventory products', async ({ inventoryPage }) => {
  // Verify we're on inventory page
  await expect(inventoryPage.getByText('Products')).toBeVisible();

  // Verify all 6 products are displayed
  const inventoryItems = inventoryPage.locator('[data-test="inventory-item"]');
  await expect(inventoryItems).toHaveCount(6);

  // Verify specific products exist
  await expect(inventoryPage.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(inventoryPage.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(inventoryPage.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  await expect(inventoryPage.getByText('Sauce Labs Onesie')).toBeVisible();
  await expect(inventoryPage.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
});
test ('Add products to cart', async ({ inventoryPage }) => {
  // Thêm sản phẩm vào giỏ hàng
  const product = inventoryPage.locator('.inventory_item', { hasText: 'Sauce Labs Backpack' });
  await product.getByRole('button', { name: 'Add to cart' }).click();

  await inventoryPage.locator('.inventory_item', { hasText: 'Sauce Labs Bike Light' })
    .getByRole('button', { name: 'Add to cart' }).click();
  // Kiểm tra biểu tượng giỏ hàng hiển thị số lượng sản phẩm
  const cartBadge = inventoryPage.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('2');

  await cartBadge.click();

  // Kiểm tra sản phẩm trong giỏ hàng
  await expect(inventoryPage.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(inventoryPage.getByText('Sauce Labs Bike Light')).toBeVisible();
});
