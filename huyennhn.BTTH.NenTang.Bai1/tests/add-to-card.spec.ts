import { test, expect } from '@playwright/test';

test('add product and check', async ({ page }) => {
    //Access
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //Input
    await page.getByRole('textbox',{name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');

    //Click 
    await page.getByRole('button',{name:'Login'}).click();

    //Check login successfully, display Product screen
    //Check url
    await expect(page).toHaveURL(/inventory.html/);
    //Has Title: Products
    await expect(page.getByText('Products')).toBeVisible();

    //Add 1st product
    const firstproduct = page.locator('.inventory_item').first();
    await firstproduct.getByRole('button',{name:'Add to cart'}).click();
    //Check cart
    const cart = page.locator('.shopping_cart_link');
    await expect(cart).toHaveText('1');

    //Add 2nd product
    const secondproduct = page.locator('.inventory_item').nth(1);
    await secondproduct.getByRole('button',{name:'Add to cart'}).click();
    //Check cart
    await expect(page.locator('.shopping_cart_link')).toHaveText('2');   
});