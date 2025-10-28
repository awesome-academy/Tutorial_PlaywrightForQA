import { test as base, Page } from '@playwright/test';

// Define interface cho fixtures
interface OrangeFixtures {
  demoOrange: Page;
}

// Extend base test với custom fixture
export const test = base.extend<OrangeFixtures>({
  demoOrange: async ({ browser }, use) => {
    const context = await browser.newContext({storageState:'./tests/auth/auth.json'});
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});
export { expect } from '@playwright/test';
