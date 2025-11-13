import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';

// Define interface cho fixture
interface OrangeFixtures {
  demoOrange: Page;
}

// Tạo fixture "loggedInPage"
// Extend base test với custom fixture
export const test = base.extend<OrangeFixtures>({
 demoOrange: async ({ page }, use) => {
   // Navigate và login
   await page.goto('https://www.saucedemo.com/');
   await page.getByPlaceholder('Username').fill('standard_user');
   await page.getByPlaceholder('Password').fill('secret_sauce');
   await page.getByRole('button', { name: 'Login' }).click();

   // Đợi login thành công
   await page.waitForURL('**/inventory.html');


   // Pass page đã login cho test
   await use(page);
 },


    // Teardown (nếu cần): logout
    // await page.getByRole('link', { name: 'Logout' }).click();
});
