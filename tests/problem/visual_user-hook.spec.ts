
import { test, expect } from '../fixtures/multi-user.fixture';

test.describe('Visual User Tests', () => {
   // ✅ Login 1 lần cho tất cả tests trong describe
  test.beforeEach(async ({ loginAs, page }) => {
    await loginAs('visual_user');
    await page.goto('https://www.saucedemo.com/inventory.html');
  });
  test('Visual user can access inventory', async ({ page }) => {
    // ✅ Không cần loginAs nữa - đã login trong beforeEach
    
    // Basic functionality check
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Swag Labs')).toBeVisible();
    
    const inventoryItems = page.locator('.inventory_item');
    const itemCount = await inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);
    
    console.log(`✅ Visual user can see ${itemCount} products`);
  });

  test('Visual user can add products to cart', async ({ page }) => {
    // ✅ Không cần loginAs và goto nữa
    
    // Add first product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Add another product
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    console.log('✅ Visual user can add products to cart');
  });

});
