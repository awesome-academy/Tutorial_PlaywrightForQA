import { Locator, Page } from '@playwright/test';
import { SaucedemoData } from '../data/SaucedemoData';

export class SaucedemoPage {
  readonly page: Page;

  // URLs
  readonly baseURL: string = 'https://www.saucedemo.com/';
  readonly inventoryURL: string = `${this.baseURL}inventory.html`;

  // Locators for login
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Locators for products page
  readonly productsTitle: Locator;
  readonly productItem: Locator;
  readonly productItemName: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  // Locators for cart page
  readonly cartIcon: Locator;
  readonly cartIconBadge: Locator;
  readonly cartItemList: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators login page
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');

    // Initialize locators products page
    this.productsTitle = page.locator('.title');
    this.productItem = page.locator('.inventory_item');
    this.productItemName = page.locator('.inventory_item_name');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');

    // Initialize locators cart page
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartIconBadge = page.locator('.shopping_cart_badge');
    this.cartItemList = page.locator('.cart_item');
  }

  async goto() {
    await this.page.goto(this.baseURL);
  }

  async loginAs(username: keyof typeof SaucedemoData.validUsers) {
    const user = SaucedemoData.validUsers[username];
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async addProductToCartByName(productName: string) {
    const productLocator = this.productItem.filter({
      has: this.productItemName.filter({ hasText: productName }),
    });
    const addToCartButton = productLocator.locator('button').filter({ hasText: 'Add to cart' });
    await addToCartButton.click();
  }

  async getCartItemCount(): Promise<number> {
    const badgeText = await this.cartIconBadge.textContent();
    return badgeText ? parseInt(badgeText) : 0;
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  getCartItemNameByIndex(index: number): Locator {
    return this.cartItemList.nth(index).locator(this.productItemName);
  }

  async removeProductFromCartByName(productName: string) {
    const productLocator = this.productItem.filter({
      has: this.productItemName.filter({ hasText: productName }),
    });
    const removeButton = productLocator.locator('button').filter({ hasText: 'Remove' });
    await removeButton.click();
  }
}
