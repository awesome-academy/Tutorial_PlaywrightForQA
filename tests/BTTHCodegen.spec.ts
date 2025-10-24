import { test, expect } from '@playwright/test';
import path from 'path';
test.describe('Check product information',()=>{
    test.use({storageState: 'tests/stage_login/.auth/user.json'});
    test.beforeEach('Access to Home page',async({page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');
    })
    test.afterEach('close site',async({page}, testInfo)=>{
        console.log('=====AfterEach infor=====');
        if(testInfo.status != testInfo.expectedStatus){
            const screenShootPath = path.join('image_test', `${testInfo.title.replace(/\s+/g, '_')}.png`);
            await page.screenshot({path:screenShootPath,fullPage: true});
            console.log('=== Screen shot ===');
        }
        page.close();
    })
    
    test('Check quantity of item displays on homepage', async ({page})=>{
        const count = await page.locator('.inventory_item').count();
        await expect(count).toEqual(6);
    })
    test('Check price of Sauce Labs Backpack', async ({page})=>{
        const backpack_inventory = await page.locator('.inventory_item',{ hasText: 'Sauce Labs Backpack' });
        await expect(backpack_inventory.locator('.inventory_item_price')).toContainText('$29.99');
    })
})
