import { test, expect } from '@playwright/test';

test.describe('Check product information',()=>{
    test.beforeEach('login site',async ({page})=>{
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();   
    })
    test.afterEach('close site',async({page})=>{
        // await page.close(); -- Không cần vì Fixture của Playwtight đã thực hiện tự động đóng browser khi không còn test nào nữa
    })
    test('Check quantity of item displays on homepage', async ({page})=>{
        const count = await page.locator('.inventory_item').count();
        expect(count).toEqual(6);
    })
    test('Check price of Sauce Labs Backpack', async ({page})=>{
        const backpack_inventory = await page.locator('.inventory_item',{ hasText: 'Sauce Labs Backpack' });
        expect(backpack_inventory.locator('.inventory_item_price')).toContainText('$29.99');
    })
})
    test.describe('Check Cart information',async()=>{
    test.beforeEach('login site',async ({page})=>{
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();   
    })
    test.afterEach('close site',async({page})=>{
        await page.close(); //-- Không cần vì Fixture của Playwtight đã thực hiện tự động đóng browser khi không còn test nào nữa
    })

    test('Add to cart', async({page})=>{
        const backpackInventory = await page.locator('.inventory_item',{ hasText: 'Sauce Labs Backpack' });
        await backpackInventory.locator('button').click();
        await page.locator('.shopping_cart_link').click();
        await expect(page.getByText('Your Cart')).toBeVisible(); //Check redirect đúng trang
        const listProduct = page.locator('.cart_item');
        await expect(listProduct.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    })
}
)
