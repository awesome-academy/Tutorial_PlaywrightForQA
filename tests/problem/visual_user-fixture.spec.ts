import { test as base, expect } from '../fixtures/multi-user.fixture';
import { Page } from '@playwright/test';

type VisualUserFixtures = {
  visualUserPage: Page;
};

export const test = base.extend<VisualUserFixtures>({
  visualUserPage: async ({ loginAs, page }, use) => {
    // ✅ Login 1 lần khi fixture được tạo
    await loginAs('visual_user');
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    await use(page);
  },
});

test.describe('Visual User Tests', () => {
  
  test('Visual user can access inventory', async ({ visualUserPage }) => {
    // ✅ Page đã login sẵn với visual_user
    await expect(visualUserPage.getByText('Products')).toBeVisible();
    
    const inventoryItems = visualUserPage.locator('.inventory_item');
    const itemCount = await inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('Visual user can add products to cart', async ({ visualUserPage }) => {
    await visualUserPage.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(visualUserPage.locator('.shopping_cart_badge')).toHaveText('1');
  });

});
