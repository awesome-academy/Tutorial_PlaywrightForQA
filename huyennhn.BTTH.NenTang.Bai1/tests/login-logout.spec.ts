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

    //Open menu and logout
    await page.getByRole('button',{name:'Open Menu'}).click();
    await page.getByRole('link',{name:'Logout'}).click();

    //Check Login screen
    //Check url
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    //Keep data in screen
    await expect(page.getByRole('textbox',{name:'Username'})).toHaveValue('');
    await expect(page.getByRole('textbox',{name:'Password'})).toHaveValue('');
});