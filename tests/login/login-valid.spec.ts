import { test, expect } from '@playwright/test';
import { SaucedemoPage } from '../../src/pages/SaucedemoPage';

test.describe('BTTH2 - Valid Login', () => {
  test('Login valid', async ({ page }) => {
    const saucedemoPage = new SaucedemoPage(page);

    // Navigate to login page
    await saucedemoPage.navigateToLogin();

    // Login with valid credentials
    await saucedemoPage.login('standard_user', 'secret_sauce');

    // Verify login success
    await saucedemoPage.verifyLoginSuccess();
  });
});