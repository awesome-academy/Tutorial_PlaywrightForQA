import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { LinksPage } from './LinksPage';

/**
 * Page Object Manager - Centralized access to all page objects
 */
export class PageManager {
  private page: Page;
  private homePage: HomePage;
  private linksPage: LinksPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.linksPage = new LinksPage(this.page);
  }

  /**
   * Get HomePage instance
   */
  getHomePage(): HomePage {
    return this.homePage;
  }

  /**
   * Get LinksPage instance
   */
  getLinksPage(): LinksPage {
    return this.linksPage;
  }

  /**
   * Navigate to home page
   */
  async goToHome(): Promise<HomePage> {
    await this.homePage.navigateToHome();
    return this.homePage;
  }

  /**
   * Navigate to links page
   */
  async goToLinks(): Promise<LinksPage> {
    await this.linksPage.navigateToLinks();
    return this.linksPage;
  }
}