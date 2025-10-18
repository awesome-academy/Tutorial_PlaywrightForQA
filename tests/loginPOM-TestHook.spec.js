const{test, expect} = require('@playwright/test');
const{LoginPage} = require('../pages/LoginPage');
test.describe('Test hooks',() =>{
    let loginPage;

    test.beforeEach(async ({page}) =>{
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test.afterEach(async({page})=>{
        await page.close();
    });
    test('Login with valid account',async ({page}) =>{
        await loginPage.login('standard_user','secret_sauce');
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products')
    });
    test('Login with invalid account',async ({page}) =>{
        await loginPage.login('standard_user','sai_mat_khau');
        await expect(page.locator('//h3[@data-test="error"]')).toContainText('Epic sadface');
    });
});
