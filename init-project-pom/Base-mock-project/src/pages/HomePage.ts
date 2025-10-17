import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DemoQA Home Page Object
 */
export class HomePage extends BasePage {
  // Page elements
  readonly header: Locator;
  readonly logo: Locator;
  readonly mainContainer: Locator;
  readonly categoryCards: Locator;
  
  // Category card selectors
  readonly elementsCard: Locator;
  readonly formsCard: Locator;
  readonly alertsFrameWindowsCard: Locator;
  readonly widgetsCard: Locator;
  readonly interactionsCard: Locator;
  readonly bookStoreCard: Locator;

  constructor(page: Page) {
    super(page, process.env.HOME_URL || 'https://demoqa.com/');
    
    // Initialize page elements
    this.header = page.locator('header');
    this.logo = page.locator('header img, .main-header img, img[src*="Toolsqa"]');
    this.mainContainer = page.locator('.category-cards').first();
    this.categoryCards = page.locator('.card-body');
    
    // Category cards - using more specific selectors
    this.elementsCard = page.locator('.card-body').filter({ hasText: 'Elements' }).first();
    this.formsCard = page.locator('.card-body').filter({ hasText: 'Forms' }).first();
    this.alertsFrameWindowsCard = page.locator('.card-body').filter({ hasText: 'Alerts, Frame & Windows' }).first();
    this.widgetsCard = page.locator('.card-body').filter({ hasText: 'Widgets' }).first();
    this.interactionsCard = page.locator('.card-body').filter({ hasText: 'Interactions' }).first();
    this.bookStoreCard = page.locator('.card-body').filter({ hasText: 'Book Store Application' }).first();
  }

  /**
   * Navigate to DemoQA home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto();
    await this.waitForPageLoad();
  }

  /**
   * Verify home page is loaded
   */
  async verifyHomePageLoaded(): Promise<void> {
    await this.verifyUrlContains('demoqa.com');
    await this.waitForElementVisible(this.mainContainer);
  }

  /**
   * Get all category cards count
   */
  async getCategoryCardsCount(): Promise<number> {
    return await this.categoryCards.count();
  }

  /**
   * Click on Elements category
   */
  async clickElementsCategory(): Promise<void> {
    await this.clickElement(this.elementsCard);
  }

  /**
   * Click on Forms category
   */
  async clickFormsCategory(): Promise<void> {
    await this.clickElement(this.formsCard);
  }

  /**
   * Click on Alerts, Frame & Windows category
   */
  async clickAlertsFrameWindowsCategory(): Promise<void> {
    await this.clickElement(this.alertsFrameWindowsCard);
  }

  /**
   * Click on Widgets category
   */
  async clickWidgetsCategory(): Promise<void> {
    await this.clickElement(this.widgetsCard);
  }

  /**
   * Click on Interactions category
   */
  async clickInteractionsCategory(): Promise<void> {
    await this.clickElement(this.interactionsCard);
  }

  /**
   * Click on Book Store category
   */
  async clickBookStoreCategory(): Promise<void> {
    await this.clickElement(this.bookStoreCard);
  }

  /**
   * Verify all main categories are visible
   */
  async verifyAllCategoriesVisible(): Promise<void> {
    await this.waitForElementVisible(this.elementsCard);
    await this.waitForElementVisible(this.formsCard);
    await this.waitForElementVisible(this.alertsFrameWindowsCard);
    await this.waitForElementVisible(this.widgetsCard);
    await this.waitForElementVisible(this.interactionsCard);
    await this.waitForElementVisible(this.bookStoreCard);
  }

  /**
   * Get category card text by index
   */
  async getCategoryCardText(index: number): Promise<string> {
    return await this.getElementText(this.categoryCards.nth(index));
  }
}