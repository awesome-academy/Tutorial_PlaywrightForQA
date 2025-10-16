import { test, expect } from '@playwright/test';

test('checkURLPage', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register');
    await expect(page.locator('//div[@class="container"]//h2')).toContainText('Register');
    await expect(page.locator('#firstName')).toBeVisible();
    await expect(page.locator('//input[@name="lastName"]')).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await page.locator('#firstName').fill('Quan');
    await page.locator('//input[@name="lastName"]').fill('Nguyen');
    await page.locator('#username').fill('quannt');
    await page.locator('#password').fill('123456');
    await page.getByRole('button',{name : 'Register'}).click();
    await expect(page.getByText('Registration successful')).toBeVisible();
    await page.close();
});
