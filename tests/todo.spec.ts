import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Học Playwright 1');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Học Playwright 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.locator('.todo-list li')).toHaveCount(2);
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});


test('test2', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Học Playwright 1');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Học Playwright 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'Học Playwright 1' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('label[data-testid="todo-title"]')).toHaveText('Học Playwright 2');
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('label[data-testid="todo-title"]')).toHaveText('Học Playwright 1');
});