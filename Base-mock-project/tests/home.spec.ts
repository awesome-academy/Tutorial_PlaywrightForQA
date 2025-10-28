import { test, expect } from '../src/fixtures/baseFixtures';
import { TestData } from '../src/data/testData';

test.describe('DemoQA Home Page Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
  });

  test('should load home page successfully', async ({ homePage }) => {
    // Verify home page is loaded
    await homePage.verifyHomePageLoaded();


    
    
    // Verify page title
    await homePage.verifyTitle(TestData.pageTitles.home);
    
    // Verify URL contains expected domain
    await homePage.verifyUrlContains('demoqa.com');
  });

  test('should display all main category cards', async ({ homePage }) => {
    // Verify all main categories are visible
    await homePage.verifyAllCategoriesVisible();
    
    // Verify we have at least 6 category cards
    const cardsCount = await homePage.getCategoryCardsCount();
    expect(cardsCount).toBeGreaterThanOrEqual(6);
  });

  test('should navigate to Elements category', async ({ homePage }) => {
    // Click on Elements category
    await homePage.clickElementsCategory();
    
    // Verify navigation to elements page
    await homePage.verifyUrlContains('elements');
  });

  test('should navigate to Forms category', async ({ homePage }) => {
    // Click on Forms category
    await homePage.clickFormsCategory();
    
    // Verify navigation to forms page
    await homePage.verifyUrlContains('forms');
  });

  test('should navigate to Alerts, Frame & Windows category', async ({ homePage }) => {
    // Click on Alerts, Frame & Windows category
    await homePage.clickAlertsFrameWindowsCategory();
    
    // Verify navigation to alerts page
    await homePage.verifyUrlContains('alertsWindows');
  });

  test('should verify category card texts contain expected values', async ({ homePage }) => {
    // Get the first few category cards and verify they contain expected text
    const cardsCount = await homePage.getCategoryCardsCount();
    
    for (let i = 0; i < Math.min(cardsCount, 6); i++) {
      const cardText = await homePage.getCategoryCardText(i);
      expect(cardText.length).toBeGreaterThan(0);
    }
  });

  test('should have valid page structure', async ({ homePage, page }) => {
    // Verify main container is visible
    await expect(homePage.mainContainer).toBeVisible();
    
    // Verify category cards are visible
    await expect(homePage.categoryCards.first()).toBeVisible();
    
    // Take screenshot for verification
    await homePage.takeScreenshot('home-page-structure');
    
    // Verify page is fully loaded
    await homePage.waitForPageLoad();


  });
});