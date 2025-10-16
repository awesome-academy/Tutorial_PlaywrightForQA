import { test, expect } from '@playwright/test';

test('Search on W3Schools', async ({ page }) => {
  // 1. Mở trang chủ
  await page.goto('https://www.w3schools.com/');

  // 2. Đợi ô tìm kiếm sẵn sàng
  await page.waitForSelector('#tnb-google-search-input');

  // 3. Nhập từ khóa vào ô tìm kiếm
  const searchBox = page.locator('#tnb-google-search-input');
  await searchBox.fill('HTML tutorial');
 await page.waitForTimeout(2000);
 
  // 4. Nhấn Enter để tìm kiếm
  await searchBox.press('Enter');
 await page.waitForTimeout(2000);
  // 5. Chờ trang mới tải xong
  await page.waitForLoadState('domcontentloaded');

  // 6. ✅ Kiểm tra tiêu đề trang có chứa từ “HTML”
  const title = await page.title();
  expect(title).toContain('HTML');
   await page.waitForTimeout(2000);
});