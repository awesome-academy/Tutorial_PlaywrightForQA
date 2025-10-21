import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();   
})
test.afterEach(async ({page}, testInfo)=>{
    if(testInfo.status != testInfo.expectedStatus){
        await page.screenshot({
            path: `image_test/${testInfo.title.replace(/\s+/g, '_')}.png`,
      fullPage: true,
        })
    }
    await page.close();
})
test('Check URL', async({page})=>{
    await expect(page).toHaveURL(/inventory/);
})
test('Check first product on list', async({page})=>{
    await expect(page.locator('.inventory_item').first()).toContainText('Sauce Labs Backpack');
})
