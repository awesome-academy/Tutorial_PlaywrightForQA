import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';
interface OrangeFixtures {
  loggedInPage: Page;
}
export const test = base.extend<OrangeFixtures>({
 loggedInPage: async ({ page }, use) => {
   await page.goto('https://www.saucedemo.com/');
   await page.getByPlaceholder('Username').fill('standard_user');
   await page.getByPlaceholder('Password').fill('secret_sauce');
   await page.getByRole('button', { name: 'Login' }).click();
   await page.waitForURL('**/inventory.html');
   await use(page);
 },
});

