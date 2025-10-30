import { test, expect } from '../fixtures/multi-user.fixture';

test.describe('Visual User Tests', () => {
  let sharedContext: any;
  let sharedPage: any;

  // ✅ Setup 1 lần cho tất cả tests
  test.beforeAll(async ({ browser, authenticatedUser }) => {
    sharedContext = await authenticatedUser('visual_user');
    sharedPage = await sharedContext.newPage();
    await sharedPage.goto('https://www.saucedemo.com/inventory.html');
  });

  // ✅ Cleanup sau tất cả tests
  test.afterAll(async () => {
    if (sharedContext) {
      await sharedContext.close();
    }
  });

  test('Visual user can access inventory', async () => {
    await expect(sharedPage.getByText('Products')).toBeVisible();
    await expect(sharedPage.getByText('Swag Labs')).toBeVisible();
    
    const inventoryItems = sharedPage.locator('.inventory_item');
    const itemCount = await inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('Visual user can add products to cart', async () => {
    await sharedPage.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(sharedPage.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
