import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import { HomePage } from '../pages/HomePage';
import { LinksPage } from '../pages/LinksPage';

/**
 * Custom fixtures for DemoQA Web tests
 */
type TestFixtures = {
  pageManager: PageManager;
  homePage: HomePage;
  linksPage: LinksPage;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  // Page Manager fixture
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },

  // Home Page fixture
  homePage: async ({ pageManager }, use) => {
    const homePage = pageManager.getHomePage();
    await use(homePage);
  },

  // Links Page fixture
  linksPage: async ({ pageManager }, use) => {
    const linksPage = pageManager.getLinksPage();
    await use(linksPage);
  }
});

export { expect } from '@playwright/test';