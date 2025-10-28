import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DemoQA Links Page Object
 */
export class LinksPage extends BasePage {
  // Page elements
  readonly pageHeader: Locator;
  readonly mainHeader: Locator;
  readonly linksContainer: Locator;
  
  // Link elements
  readonly homeLink: Locator;
  readonly homeDynamicLink: Locator;
  readonly createdLink: Locator;
  readonly noContentLink: Locator;
  readonly movedLink: Locator;
  readonly badRequestLink: Locator;
  readonly unauthorizedLink: Locator;
  readonly forbiddenLink: Locator;
  readonly notFoundLink: Locator;
  
  // Response message
  readonly linkResponse: Locator;

  constructor(page: Page) {
    super(page, process.env.LINKS_URL || 'https://demoqa.com/links');
    
    // Initialize page elements
    this.pageHeader = page.locator('.main-header, h1, .text-center');
    this.mainHeader = page.locator('.main-header, h1:has-text("Links")');
    this.linksContainer = page.locator('.links-wrapper, #linkWrapper, .col-12');
    
    // Initialize link elements
    this.homeLink = page.locator('#simpleLink, a:has-text("Home")').first();
    this.homeDynamicLink = page.locator('#dynamicLink, a:has-text("Home")').nth(1);
    this.createdLink = page.locator('#created, a:has-text("Created")');
    this.noContentLink = page.locator('#no-content, a:has-text("No Content")');
    this.movedLink = page.locator('#moved, a:has-text("Moved")');
    this.badRequestLink = page.locator('#bad-request, a:has-text("Bad Request")');
    this.unauthorizedLink = page.locator('#unauthorized, a:has-text("Unauthorized")');
    this.forbiddenLink = page.locator('#forbidden, a:has-text("Forbidden")');
    this.notFoundLink = page.locator('#invalid-url, a:has-text("Not Found")');
    
    // Response message
    this.linkResponse = page.locator('#linkResponse, .link-response');
  }

  /**
   * Navigate to Links page
   */
  async navigateToLinks(): Promise<void> {
    await this.goto();
    await this.waitForPageLoad();
  }

  /**
   * Verify Links page is loaded
   */
  async verifyLinksPageLoaded(): Promise<void> {
    await this.verifyUrlContains('links');
    await this.waitForElementVisible(this.linksContainer);
  }

  /**
   * Click Home link (simple link)
   */
  async clickHomeLink(): Promise<void> {
    await this.clickElement(this.homeLink);
  }

  /**
   * Click Home Dynamic link
   */
  async clickHomeDynamicLink(): Promise<void> {
    await this.clickElement(this.homeDynamicLink);
  }

  /**
   * Click Created link (API call)
   */
  async clickCreatedLink(): Promise<void> {
    await this.clickElement(this.createdLink);
  }

  /**
   * Click No Content link (API call)
   */
  async clickNoContentLink(): Promise<void> {
    await this.clickElement(this.noContentLink);
  }

  /**
   * Click Moved link (API call)
   */
  async clickMovedLink(): Promise<void> {
    await this.clickElement(this.movedLink);
  }

  /**
   * Click Bad Request link (API call)
   */
  async clickBadRequestLink(): Promise<void> {
    await this.clickElement(this.badRequestLink);
  }

  /**
   * Click Unauthorized link (API call)
   */
  async clickUnauthorizedLink(): Promise<void> {
    await this.clickElement(this.unauthorizedLink);
  }

  /**
   * Click Forbidden link (API call)
   */
  async clickForbiddenLink(): Promise<void> {
    await this.clickElement(this.forbiddenLink);
  }

  /**
   * Click Not Found link (API call)
   */
  async clickNotFoundLink(): Promise<void> {
    await this.clickElement(this.notFoundLink);
  }

  /**
   * Wait for and get link response message
   */
  async getLinkResponseMessage(): Promise<string> {
    await this.waitForElementVisible(this.linkResponse);
    return await this.getElementText(this.linkResponse);
  }

  /**
   * Verify link response contains expected status
   */
  async verifyLinkResponse(expectedStatus: string): Promise<boolean> {
    const responseText = await this.getLinkResponseMessage();
    return responseText.includes(expectedStatus);
  }

  /**
   * Get all visible links count
   */
  async getVisibleLinksCount(): Promise<number> {
    const allLinks = this.page.locator('a:visible');
    return await allLinks.count();
  }

  /**
   * Check if response message is visible
   */
  async isResponseMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.linkResponse);
  }
}