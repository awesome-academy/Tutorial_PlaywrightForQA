import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/collections/frontpage/products/grey-jacket');
  // Action add sản phẩm vào giỏ hàng
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('#cart-target-desktop span')).toContainText('1');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('#cart-target-desktop span')).toContainText('2');
});