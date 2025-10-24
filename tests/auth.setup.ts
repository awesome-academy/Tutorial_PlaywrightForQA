
import { test as setup, expect } from '@playwright/test';

// Set the file name to store authentication state.
const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Go to the login page
  await page.goto('https://www.saucedemo.com/');

  // Fill in credentials
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Click the login button
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Save authentication state (cookies, localStorage) to file
  await page.context().storageState({ path: authFile });

});
