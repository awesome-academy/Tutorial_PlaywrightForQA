import { test, expect } from '@playwright/test';

test('checkAddToCart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('textbox', {name :'Username'}).fill('standard_user')
    await page.getByRole('textbox',{name : 'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name : 'Login'}).click()
    await page.locator("//img[@alt= 'Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button").click()
    await expect(await page.locator('.shopping_cart_badge')).toHaveText('1')
    await page.locator("//img[@alt= 'Sauce Labs Bike Light']/ancestor::div[@class='inventory_item']//button").click()
    await expect(await page.locator('.shopping_cart_badge')).toHaveText('2')
});
test('checkLogout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('textbox', {name :'Username'}).fill('standard_user')
    await page.getByRole('textbox',{name : 'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name : 'Login'}).click()
    await page.locator('.bm-burger-button').click()
    await page.locator('#logout_sidebar_link').click()
    await expect(await page.locator('.login_logo')).toBeVisible()
});
