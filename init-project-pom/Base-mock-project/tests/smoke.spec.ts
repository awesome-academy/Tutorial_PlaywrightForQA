import { test, expect } from '../src/fixtures/baseFixtures';

test.describe('DemoQA Basic Smoke Tests', () => {
  test('should load DemoQA home page', async ({ page }) => {
    // Navigate to DemoQA home page
    await page.goto('https://demoqa.com/');
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    
    // Verify page title
    await expect(page).toHaveTitle('DEMOQA');
    
    // Verify URL
    expect(page.url()).toContain('demoqa.com');
    
    // Take a screenshot
    await page.screenshot({ path: 'screenshots/home-page-basic.png', fullPage: true });
  });

  test('should find category cards on home page', async ({ page }) => {
    // Navigate to DemoQA home page
    await page.goto('https://demoqa.com/');
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    
    // Look for category cards using different selectors
    const categoryCards = page.locator('.card-body, .card, [class*="card"]');
    
    // Wait for at least one card to be visible
    await expect(categoryCards.first()).toBeVisible({ timeout: 10000 });
    
    // Count visible cards
    const cardCount = await categoryCards.count();
    console.log(`Found ${cardCount} category cards`);
    
    // Verify we have some cards
    expect(cardCount).toBeGreaterThan(0);
  });
});