import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { SaucedemoData } from '../data/saucedemoData';

/**
 * Saucedemo Page Object
 * Handles all interactions with Saucedemo login and inventory pages
 */
export class SaucedemoPage extends BasePage {
  // Page elements - Login page
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // Page elements - Inventory page
  readonly productsTitle: Locator;
  readonly inventoryList: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    super(page, SaucedemoData.urls.base);

    // Initialize login page elements
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');

    // Initialize inventory page elements
    this.productsTitle = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  /**
   * Navigate to Saucedemo login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto();
    await this.waitForPageLoad();
  }

  /**
   * Perform login action
   * @param username - Username for login
   * @param password - Password for login
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verify login success by checking the products page title
   */
  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(SaucedemoData.urls.inventory);
    await expect(this.productsTitle).toHaveText(SaucedemoData.pageText.productsTitle);
    await expect(this.inventoryList).toBeVisible();
  }

  /**
   * Get the current error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Check if user is logged in (on inventory page)
   */
  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('inventory.html');
  }

  /**
   * Verify error message is displayed
   * @param expectedMessage - Expected error message text
   */
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedMessage);
    await expect(this.errorMessage).toBeVisible();
  }
}