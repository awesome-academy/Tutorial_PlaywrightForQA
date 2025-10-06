import { test, expect } from '@playwright/test';

test.describe('Login tests on saucedemo.com', () => {
    const baseURL = 'https://www.saucedemo.com/';

    test('Successful login with valid credentials', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('Login fails with invalid password', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'wrong_password');
        await page.click('#login-button');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Username and password do not match/);
    });

    test('Login fails with locked out user', async ({ page }) => {
        await page.goto(baseURL);
        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page.locator('[data-test="error"]')).toHaveText(/Sorry, this user has been locked out/);
    });
});