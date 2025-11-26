import { test, expect } from '@playwright/test';
test('test search data ', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');
  await page.getByRole('textbox', { name: 'Search our tutorials' }).click();
  await page.getByRole('textbox', { name: 'Search our tutorials' }).fill('html list');
  await page.getByRole('textbox', { name: 'Search our tutorials' }).press('Enter');
  await expect(page).toHaveURL('https://www.w3schools.com/html/html_lists.asp');
});