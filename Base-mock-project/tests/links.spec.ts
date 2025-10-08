import { test, expect } from '../src/fixtures/baseFixtures';
import { TestData } from '../src/data/testData';

test.describe('DemoQA Links Page Tests', () => {
  test.beforeEach(async ({ linksPage }) => {
    await linksPage.navigateToLinks();
  });

  test('should handle Bad Request API call', async ({ linksPage }) => {
    // Click Bad Request link
    await linksPage.clickBadRequestLink();
    
    // Verify response message appears
    await expect(linksPage.linkResponse).toBeVisible();
    
    // Verify response contains status code
    const responseText = await linksPage.getLinkResponseMessage();
    expect(responseText).toContain('400');
  });
});