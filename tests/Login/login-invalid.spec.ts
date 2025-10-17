import { test, expect } from '@playwright/test';
test ('login fail 1', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('123');
    await page.locator('#login-button').click();
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
});
test ('login fail 2', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#password').fill('123');
    await page.locator('#login-button').click();
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
});
test ('login fail 3', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('User locked');
});
