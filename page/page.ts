import {Page, expect} from '@playwright/test';
import {users} from '../src/data/data';
import { messages, urls } from '../src/constants';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }
}
export class RegisterPage extends BasePage {
    // Page title
    readonly pageTitle = this.page.locator('h2');
    // Input fields
    readonly firstnameInput = this.page.locator('input[ng-model="vm.user.firstName"]');
    readonly lastnameInput = this.page.locator('input[ng-model="vm.user.lastName"]');
    readonly usernameInput = this.page.locator('input[ng-model="vm.user.username"]');
    readonly passwordInput = this.page.locator('input[ng-model="vm.user.password"]');
    // Buttons and messages
    readonly registerButton = this.page.locator('button[type="submit"]');
    readonly successMessage = this.page.locator('div.alert-success');
    readonly cancelButton = this.page.locator('a[href="#/login"]');

    async gotoRegisterPage(): Promise<void> {
        await this.goto(urls.register);
    }
    async verifyPageElements(): Promise<void> {
        await expect(this.pageTitle).toHaveText(messages.pageTitles.register);
        await expect(this.firstnameInput).toBeVisible();
        await expect(this.lastnameInput).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.registerButton).toBeVisible();
    }
    async registerUser(): Promise<void> {
        await this.firstnameInput.fill(users.registerUser.firstname);
        await this.lastnameInput.fill(users.registerUser.lastname);
        await this.usernameInput.fill(users.registerUser.username);
        await this.passwordInput.fill(users.registerUser.password);
        await this.registerButton.click();

    }
}
export class LoginPage extends BasePage {
    readonly usernameInput = this.page.locator('#username');
    readonly passwordInput = this.page.locator('#password');
    readonly loginButton = this.page.locator('button[type="submit"]');

    async gotoLoginPage(): Promise<void> {
        await this.goto(urls.login);
    }
    async loginUser(): Promise<void> {
        await this.usernameInput.fill(users.loginUser.username);
        await this.passwordInput.fill(users.loginUser.password);
        await this.loginButton.click();

    }
}

export class HomePage extends BasePage {
    readonly heading = this.page.locator('h1');
    readonly usersList = this.page.locator('ul li');

    async verifyUserLoggedIn(firstname: string, username: string, lastname: string): Promise<void> {
        await expect(this.heading).toHaveText(`Hi ${firstname}!`);
        await expect(this.usersList.first()).toContainText(`${username} (${firstname} ${lastname})`);
    }
}
