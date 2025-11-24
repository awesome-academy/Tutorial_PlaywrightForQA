import { test, expect } from '@playwright/test';

test('Check product info', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/');
  await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();
  await expect(page.locator('#product-price')).toHaveText('£55.00');
  await expect(page.locator('#product-form h1')).toHaveText('Grey jacket');
});

test('Check breadcrumb', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/');
  await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();
  await expect(page.locator('#breadcrumb > span:first-child a span')).toHaveText('Home');
  await expect(page.locator('#breadcrumb > span:nth-child(2) > a:first-child span')).toHaveText('Frontpage');
  await expect(page.locator('#breadcrumb > span:nth-child(2) > a:nth-child(2) ')).toHaveText('Grey jacket');
});

test('Check link image', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/');
  await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();
  const imageLocator = page.locator('#feature-image'); 
  const srcValue = await imageLocator.getAttribute('src');
  await expect(srcValue).toContain('//sauce-demo.myshopify.com/cdn/shop/products/fleece.jpg?v=1394656989');
 });