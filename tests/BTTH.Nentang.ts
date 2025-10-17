import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');
  await page.getByRole('textbox', { name: 'Search our tutorials' }).click();
  await page.getByRole('textbox', { name: 'Search our tutorials' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search our tutorials' }).fill('SQL');
  await page.getByRole('textbox', { name: 'Search our tutorials' }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Learn SQL' })).toBeVisible();

});