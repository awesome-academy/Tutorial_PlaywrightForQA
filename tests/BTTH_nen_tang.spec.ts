import { test, expect } from '@playwright/test';
test ('search', async ({ page }) => {
await page.goto('https://www.w3schools.com/');
await page.locator('#tnb-google-search-input').fill('HTML');
await page.locator('#tnb-google-search-submit-btn').click();
  console.log('✅ Tìm kiếm thành công!');
});
