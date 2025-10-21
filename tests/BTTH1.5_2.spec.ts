import { test, expect } from '@playwright/test';

test.describe('Check product group',()=>{
    test.beforeEach('login site',async ({page})=>{
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();   
    })
    test.afterEach('close site',async({page})=>{
        await page.close();
    })
    test('Check quantity of item displays on homepage', async ({page})=>{
        const count = await page.locator('.inventory_item').count();
        expect(count).toEqual(6);
    })
})
