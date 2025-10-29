import { expect, test as baseTest } from './login.fixture';
import { Page } from '@playwright/test';

type CustomFixtures = {
  inventoryPage: Page;
};

export const test = baseTest.extend<CustomFixtures>({
  inventoryPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await use(page);
  },
});

export { expect };
