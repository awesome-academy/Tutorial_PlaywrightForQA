import { test, expect } from '@playwright/test';

test('login fail: wrong password', async ({ page }) => {
    //Access
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //Input
    await page.getByRole('textbox',{name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name:'Password'}).fill('aaaaaaa');

    //Click 
    await page.getByRole('button',{name:'Login'}).click();

    //Check login successfully, display Product screen
    //Check url
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    //Has error msg
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    //Keep data in screen
    await expect(page.getByRole('textbox',{name:'Username'})).toHaveValue('standard_user');
    await expect(page.getByRole('textbox',{name:'Password'})).toHaveValue('aaaaaaa');

});

test('login fail: missing username', async ({ page }) => {
    //Access
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //Input
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');

    //Click 
    await page.getByRole('button',{name:'Login'}).click();

    //Check login successfully, display Product screen
    //Check url
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    //Has error msg
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    //Username still blank
    await expect(page.getByRole('textbox',{name:'Username'})).toHaveValue('');
    //Password keep data
    await expect(page.getByRole('textbox',{name:'Password'})).toHaveValue('secret_sauce');

});

test('login fail: locked_out_user', async ({ page }) => {
    //Access
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //Input
    await page.getByRole('textbox',{name:'Username'}).fill('locked_out_user');
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');

    //Click 
    await page.getByRole('button',{name:'Login'}).click();

    //Check login successfully, display Product screen
    //Check url
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    //Keep data in screen
    await expect(page.getByRole('textbox',{name:'Username'})).toHaveValue('locked_out_user');
    await expect(page.getByRole('textbox',{name:'Password'})).toHaveValue('secret_sauce');
    //Has error msg
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();

});