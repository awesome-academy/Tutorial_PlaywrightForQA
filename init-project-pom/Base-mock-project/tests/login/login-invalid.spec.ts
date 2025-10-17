import { test, expect } from '@playwright/test';
import { SaucedemoPage } from '../../src/pages/SaucedemoPage';

test.describe('BTTH HTML Basics - Invalid Login', () => {
    test('Login locked_out_user', async ({ page }) => {
        const saucedemoPage = new SaucedemoPage(page);
        
        // Navigate to login page
        await saucedemoPage.navigateToLogin();
        
        // Login with locked_out_user
        await saucedemoPage.login('locked_out_user', 'secret_sauce');
        
        // Verify error message
        await saucedemoPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Login blank user-name', async ({ page }) => {
        const saucedemoPage = new SaucedemoPage(page);
        
        // Navigate to login page
        await saucedemoPage.navigateToLogin();
        
        // Login with blank username
        await saucedemoPage.login('', 'secret_sauce');
        
        // Verify error message
        await saucedemoPage.verifyErrorMessage('Epic sadface: Username is required');
    });

    test('Login invalid password', async ({ page }) => {
        const saucedemoPage = new SaucedemoPage(page);
        
        // Navigate to login page
        await saucedemoPage.navigateToLogin();
        
        // Login with invalid password
        await saucedemoPage.login('standard_user', 'invalid_password');
        
        // Verify error message
        await saucedemoPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
});
