import { test, expect } from './fixtures/multi-user.fixture';

test.describe('Visual User Tests', () => {
  
  test('Visual user can login and access inventory', async ({ loginAs, page }) => {
    await loginAs('visual_user');
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Basic functionality check
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Swag Labs')).toBeVisible();
    
    // Check inventory items are displayed
    const inventoryItems = page.locator('.inventory_item');
    const itemCount = await inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);
    
    console.log(`✅ Visual user can see ${itemCount} products`);
  });

  test('Visual user can add products to cart', async ({ loginAs, page }) => {
    await loginAs('visual_user');
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Add first product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verify cart badge appears
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Add another product
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    console.log('✅ Visual user can add products to cart');
  }); 
});
