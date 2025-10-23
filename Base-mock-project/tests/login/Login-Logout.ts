import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly passWord: Locator;
  readonly button: Locator;
  readonly errorMessage: Locator;
  readonly iconMenu: Locator;
  readonly linkLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('[data-test="username"]');
    this.passWord = page.locator("#password");
    this.button = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
    this.iconMenu = page.locator("#react-burger-menu-btn");
    this.linkLogout=page.locator('[data-test="logout-sidebar-link"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.button.click();
  }

  async logout() {
    await this.iconMenu.click();
    await this.linkLogout.click();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }
 async expectURL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }

}
