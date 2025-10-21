import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('textbox', {name :'Username'}).fill('standard_user')
    await page.getByRole('textbox',{name : 'Password'}).fill('')
    await page.getByRole('button', {name : 'Login'}).click()
    await expect(page.locator('[data-test="error"]')).toHaveText(
     'Epic sadface: Password is required'
    );
    
});