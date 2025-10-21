const{test, expect} = require('@playwright/test');
const{LoginPage} = require('../pages/LoginPage');
test('Login valid', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});
