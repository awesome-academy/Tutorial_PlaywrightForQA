import {test, expect} from '@playwright/test';
import { LoginPage, RegisterPage, HomePage } from '../page/page';
import { users } from '../src/data/data';
import { messages,urls} from '../src/constants';

test.describe('BTTH1.4~1.4 Tests', () => {
    test('Register & Login functionality', async ({ page }) => {
        const registerPage = new RegisterPage(page);
    // Open register page
        await registerPage.gotoRegisterPage();
    // Check title and elements
        await registerPage.verifyPageElements();

    // Register user
        await registerPage.registerUser();
        await expect(registerPage.successMessage).toHaveText(messages.success.register);

    // Login with registered user
        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.loginUser();

    // Verify home page

        const homePage = new HomePage(page);
        await expect(page).toHaveURL(urls.home);
        await homePage.verifyUserLoggedIn(
            users.registerUser.firstname,
            users.loginUser.username,
            users.registerUser.lastname
        );
    });
});
