import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// Sử dụng auth từ setup (standard_user)
type InventoryFixtures = {
  inventoryPage: Page;
};

export const test = base.extend<InventoryFixtures>({
  context: async ({ browser }, use) => {
    // Load standard_user auth từ setup
    const context = await browser.newContext({
      storageState: '.auth/standard_user.json'
    });
    await use(context);
    await context.close();
  },

  inventoryPage: async ({ page }, use) => {
    console.log('🔄 Navigating to inventory page (standard_user)');
    await page.goto('https://www.saucedemo.com/inventory.html');
    await use(page);
  },
});

export { expect };
